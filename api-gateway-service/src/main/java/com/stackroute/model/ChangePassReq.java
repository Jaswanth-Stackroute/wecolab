package com.stackroute.model;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePassReq {
    private String emailId;
    private String currentPassword;
    private String newPassword;
}
