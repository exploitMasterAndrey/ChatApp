package com.project.chatapp.service;

import com.project.chatapp.model.Message;
import com.project.chatapp.model.User;
import com.project.chatapp.repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
public class MessageService {
    @Autowired
    private MessageRepo messageRepo;

    public List<Message> getMessagesHistory(User from, User to){
        List<Message> messagesFromFirst = messageRepo.findMessagesBySenderUserNameAndReceiverUserName(from.getUsername(), to.getUsername());
        List<Message> messagesFromSecond = messageRepo.findMessagesBySenderUserNameAndReceiverUserName(to.getUsername(), from.getUsername());

        List<Message> history = Stream.concat(messagesFromFirst.stream(), messagesFromSecond.stream()).sorted(Comparator.comparing(Message::getTime)).toList();
        return history;
    }

    public void save(Message msg){
        messageRepo.save(msg);
    }

    public List<User> findAllUserChats(String authenticatedUserEmail){
        return messageRepo.findAllUserChats(authenticatedUserEmail);
    }

}
