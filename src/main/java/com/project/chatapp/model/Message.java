package com.project.chatapp.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Builder
@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    private User sender;

    @OneToOne(fetch = FetchType.EAGER)
    private User receiver;

    private String message;

    private LocalDateTime time;
}
