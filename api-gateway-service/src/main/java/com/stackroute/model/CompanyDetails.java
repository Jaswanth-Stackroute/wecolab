package com.stackroute.model;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDetails
{
    private long id;
    private String companyId;
    private String companyName;
    private String emailId;
    private String firstName;
    private String lastName;
    private String phone;
    private String password;

}
