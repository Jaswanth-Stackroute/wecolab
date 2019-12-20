package com.stackroute.multicasting.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Message {
    @Id
    private Long conversationId;
    private int fromId;
    private int toId;
    private String dateTime;
    private String content;
    private boolean groupMessage;

}
