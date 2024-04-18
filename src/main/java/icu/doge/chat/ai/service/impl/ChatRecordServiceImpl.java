package icu.doge.chat.ai.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import icu.doge.chat.ai.domain.ChatRecord;
import icu.doge.chat.ai.mapper.ChatRecordMapper;
import icu.doge.chat.ai.service.IChatRecordService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ChatRecordServiceImpl implements IChatRecordService {

    private final ChatRecordMapper chatRecordMapper;

    public ChatRecordServiceImpl(ChatRecordMapper chatRecordMapper) {
        this.chatRecordMapper = chatRecordMapper;
    }

    @Override
    public List<ChatRecord> selectChatRecordListByCid(String cId) {
        QueryWrapper<ChatRecord> chatRecordQueryWrapper = new QueryWrapper<>();
        chatRecordQueryWrapper.eq("c_id", cId);
        return chatRecordMapper.selectList(chatRecordQueryWrapper);
    }

    @Override
    public void insertChatRecord(ChatRecord chatRecord) {
        chatRecordMapper.insert(chatRecord);
    }
}
