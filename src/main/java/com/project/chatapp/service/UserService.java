package com.project.chatapp.service;

import com.project.chatapp.model.User;
import com.project.chatapp.repo.MessageRepo;
import com.project.chatapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findUserByEmail(email);
        return user.isPresent() ? user.get() : null;
    }

    public void save(User usr){
        userRepo.save(usr);
    }

    public Optional<User> findUserByName(String name){
        return userRepo.findByUserName(name);
    }

    public List<User> findAllUsersFromInput(String name){
        return userRepo.findAllUsersFromInput(name);
    }

    public User findUser(Long id){
        return userRepo.findUserById(id);
    }
}
