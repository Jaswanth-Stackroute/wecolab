package com.stackroute.model;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddMemberReq {
    private String emailId;
    private int companyId;


}
