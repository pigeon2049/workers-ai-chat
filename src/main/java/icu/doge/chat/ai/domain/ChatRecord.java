package icu.doge.chat.ai.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName("chat_record")
public class ChatRecord
{

    private Long id;

    private String role;

    private String content;

    /** 时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date time;

    private Long userId;

    private String cId;


}
