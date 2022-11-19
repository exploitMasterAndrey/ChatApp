package com.project.chatapp.controller;

import com.project.chatapp.model.Message;
import com.project.chatapp.model.User;
import com.project.chatapp.service.MessageService;
import com.project.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @MessageMapping("/chat.send/{id1}/{id2}")
    @SendTo("/topic/{id1}/{id2}")
    public Message sendMessage(@Payload Message message) {
        User sender = userService.findUser(message.getSender().getId());
        User receiver = userService.findUser(message.getReceiver().getId());

        message.setSender(sender);
        message.setReceiver(receiver);
        messageService.save(message);
        return message;
    }

    @GetMapping("/chat")
    public String getChatPage() {
        return "messages";
    }
}
