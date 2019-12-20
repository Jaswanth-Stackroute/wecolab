package com.stackroute.model;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactUsReq
{
    private String emailId;
    private String firstName;
    private String issue;
    private String lastName;
    private String message;
    private String phone;

}
