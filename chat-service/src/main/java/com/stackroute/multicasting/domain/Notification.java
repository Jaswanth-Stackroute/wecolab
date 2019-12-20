package com.stackroute.multicasting.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Notification {
    @Id
    private Long conversationId;
    private int fromId;
    private int toId;
    private int groupId;
    private String groupName;
    private String dateTime;
}
