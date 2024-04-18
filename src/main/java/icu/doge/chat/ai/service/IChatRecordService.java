package icu.doge.chat.ai.service;



import icu.doge.chat.ai.domain.ChatRecord;

import java.util.List;



public interface IChatRecordService
{


    public List<ChatRecord> selectChatRecordListByCid(String cId);

    public void insertChatRecord(ChatRecord chatRecord);
}
