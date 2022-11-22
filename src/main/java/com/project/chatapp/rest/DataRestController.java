package com.project.chatapp.rest;

import com.project.chatapp.model.Message;
import com.project.chatapp.model.User;
import com.project.chatapp.service.MessageService;
import com.project.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class DataRestController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @GetMapping("/getAllUserChats")
    public List<User> getAllUserChats(@AuthenticationPrincipal User from){
        return messageService.findAllUserChats(from.getEmail());
    }

    @GetMapping("/findUsersByName")
    public List<User> findUsers(@RequestHeader("input") String input){
        return userService.findAllUsersFromInput(input);
    }

    @GetMapping("/findUser")
    public User findUser(@RequestHeader("id") Long id){
        return userService.findUser(id);
    }

    @GetMapping("/getHistory")
    public List<Message> getHistory(@RequestHeader("myName") String myName, @RequestHeader("friendName") String friendName){
        Optional<User> me = userService.findUserByName(myName);
        Optional<User> friend = userService.findUserByName(friendName);
        return messageService.getMessagesHistory(me.get(), friend.get());
    }

    @GetMapping("/getLoggedUserCredentials")
    public User getLoggedUserCredentials(@AuthenticationPrincipal User user){
        return userService.findUser(user.getId());
    }

    @GetMapping("/getMessage")
    public Message getMessage(@RequestHeader("id") Long id){
        return messageService.findMessage(id);
    }

    @GetMapping("/updateMessage")
    public Message updateMessage(@RequestHeader("id") Long id, @RequestHeader("text") String text){
        Message message = messageService.updateMessage(id, text);
        return message;
    }

    @GetMapping("/deleteMessage")
    public void deleteMessage(@RequestHeader("id") Long id){
        messageService.deleteMessage(id);
    }
}
