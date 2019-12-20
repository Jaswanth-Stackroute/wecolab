package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//   domain or  model

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBasicInfo {

    private long id;
    private String name;
    private  String email;
    private int companyId;
    private String phone;
    private String role;
    private String profilePic;
    private boolean enabled;

}
