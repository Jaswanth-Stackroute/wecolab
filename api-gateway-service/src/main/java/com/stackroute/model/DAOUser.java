package com.stackroute.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class DAOUser
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    private String emailId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name="password")
    private String password;

    private String firstName;

    private String lastName;

    private String phone;

    private String role;

    private String profilePic;

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    private boolean isEnabled=false;

    @OneToOne(targetEntity = Company.class,fetch = FetchType.EAGER)
    @JoinColumn(nullable = true,name = "company_id")
    private Company company;

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public DAOUser(long userId, String emailId, String password, String firstName, String lastName, String phone, String role, String profilePic, Company company) {
        this.userId = userId;
        this.emailId = emailId;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.role = role;
        this.profilePic = profilePic;
        this.company = company;
    }
}
