package com.stackroute.multicasting.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class GroupDetails {
    @Id
    private int  id;
    private String name;
    private String description;
    private String createdAt;
    private int adminId;
    private int teamId;
}


