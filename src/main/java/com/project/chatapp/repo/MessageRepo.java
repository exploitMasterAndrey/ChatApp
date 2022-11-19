package com.project.chatapp.repo;

import com.project.chatapp.model.Message;
import com.project.chatapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
    List<Message> findMessagesBySenderUserNameAndReceiverUserName(String from, String to);

    @Query("SELECT u " +
            "FROM User u " +
            "WHERE u.id IN (SELECT m.receiver.id FROM Message m where m.sender.email like :userFromEmail) " +
            "OR u.id IN (SELECT m.sender.id FROM Message m where m.receiver.email like :userFromEmail)")
    List<User> findAllUserChats(@Param("userFromEmail") String userFromEmail);
}

