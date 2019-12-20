package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
//   domain or  model

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Entity
//@Table(name="Room")
public class RoomLink {

    private int id;
    private String name;
    private  String agenda;
    private int companyId;
    private int adminId;
    private java.sql.Date sqlDate;
    private java.sql.Time sqlTime;
    private  String url;
    private List<Integer> roomUser;


}
