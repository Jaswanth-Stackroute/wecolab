package com.stackroute.model;

import lombok.*;

import java.util.List;
import java.util.Map;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Mail {

    private String from;
    private String to;
    private String subject;
    private List<Object> attachments;
    private Map<String, Object> model;
    private String template;
}