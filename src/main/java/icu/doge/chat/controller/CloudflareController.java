package icu.doge.chat.controller;

import cn.hutool.core.lang.generator.SnowflakeGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import icu.doge.chat.ai.domain.ChatRecord;
import icu.doge.chat.ai.service.IChatRecordService;
import icu.doge.chat.bean.AjaxResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.*;

@RestController
@RequestMapping("/ai")
public class CloudflareController {

    @Value("${cloudflare.ai-url}")
    private  String url;

    @Value("${cloudflare.api-token}")
    private  String apiToken;

    @Value("${cloudflare.account-id}")
    private  String accountId;

    @Value("${cloudflare.model}")
    private  String model;

    @Value("${cloudflare.system-prompt}")
    private  String systemPrompt;

    private final WebClient.Builder webClientBuilder;

    private final IChatRecordService chatRecordService;

    public CloudflareController(WebClient.Builder webClientBuilder, IChatRecordService chatRecordService, IChatRecordService chatRecordService1) {
        this.webClientBuilder = webClientBuilder;
        this.chatRecordService = chatRecordService1;
    }

    //新对话时调用 获取唯一id 前端onmount时调用
    @GetMapping(value = "/getUniqueId")
    public AjaxResult getUniqueId() {
        String uniqueId = new SnowflakeGenerator().next().toString();
        return AjaxResult.success("ok",uniqueId);
    }



    @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> sseEndpoint(@RequestParam String content
            , @RequestParam String id) {

        String finalUrl = url.replace("{account_id}", accountId).replace("{model_name}", model);
        LinkedList<AiContent> contents=new LinkedList<>();
        //判断是否是新对话
        String cId;
        if (!StringUtils.hasText(id)){
            return Flux.never();
        }else {
            cId=id;
            List<ChatRecord> chatRecords = chatRecordService.selectChatRecordListByCid(cId);
            if (CollectionUtils.isEmpty(chatRecords)){
                contents.addFirst(new AiContent("system", systemPrompt));
                contents.addLast(new AiContent("user", content));
                insertChatRecord("system", id, systemPrompt, null);
            }else {
                chatRecords.forEach(s->{
                    contents.addLast(new AiContent(s.getRole(),s.getContent()));
                });
                contents.addLast(new AiContent("user", content));
            }

            insertChatRecord("user", id, content, null);


        }

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> requestBody = new HashMap<>();
        try {
            requestBody.put("messages",  mapper.writeValueAsString(contents));
        } catch (JsonProcessingException e) {
            return Flux.never();
        }
        requestBody.put("stream", true);

        // 构造 assistant 的回复
        StringBuilder allReplies = new StringBuilder();
        return Flux.create(sink -> {
            WebClient.ResponseSpec responseSpec = webClientBuilder.baseUrl(finalUrl)
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .defaultHeader(HttpHeaders.AUTHORIZATION, apiToken)
                    .build()
                    .post()
                    .body(BodyInserters.fromValue(requestBody))
                    .retrieve();

            responseSpec.bodyToFlux(String.class)
                    .subscribe(
                            data -> {
                                if ("[DONE]".equals(data)) {
                                    // 发送一次 [DONE] 消息
                                    sink.next(ServerSentEvent.<String>builder().data(data).build());
                                    // 关闭 SSE 连接
                                    sink.complete();

                                    // 将 assistant 的回复插入数据库
                                    insertChatRecord("assistant", cId, allReplies.toString(), null);

                                    System.out.println("[DONE]");
                                } else {
                                    try {
                                        // 在处理响应的地方
                                        JsonNode jsonNode = mapper.readTree(data);
                                        String response = jsonNode.get("response").asText();
                                        allReplies.append(response);
                                    }catch (Exception ignored){}

                                    sink.next(ServerSentEvent.<String>builder().data(data).build());
                                }
                            },
                            sink::error,
                            sink::complete
                    );
        });
    }

    private void insertChatRecord(String role, String id, String content, Long userId) {
        ChatRecord tempUser = new ChatRecord();
        tempUser.setRole(role);
        tempUser.setCId(id);
        tempUser.setTime(new Date());
        tempUser.setContent(content);
        tempUser.setUserId(userId);
        chatRecordService.insertChatRecord(tempUser);
    }

    public record AiContent(String role,String content){}





}
