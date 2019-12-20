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
public class Notify {
    private int fromid;
    private int toid;
    private String filename;
    private String ext;
    private String lastext;
    private Long fileid;
}
