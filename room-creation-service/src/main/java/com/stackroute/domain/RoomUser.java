package com.stackroute.domain;

import java.util.ArrayList;
import java.util.List;
//   domain or  model

//@Entity
//@Table(name="RoomUser")
public class RoomUser {

    private String name;
    private  String agenda;
    private int companyId;
    private int adminId;
//    private java.sql.Date sqlDate;
//    private java.sql.Time sqlTime;
    private String sqlDate;
    private String sqlTime;
    private List<Integer> uIds = new ArrayList<>();


    @Override
    public String toString() {
        return "RoomUser{" +
                "name='" + name + '\'' +
                ", agenda='" + agenda + '\'' +
                ", companyId=" + companyId +
                ", adminId=" + adminId +
                ", sqlDate=" + sqlDate +
                ", sqlTime=" + sqlTime +
                ", uIds=" + uIds.toString() +
                '}';
    }

    public RoomUser(String name, String agenda, int companyId, int adminId, String sqlDate, String sqlTime, List<Integer> uIds) {
        this.name = name;
        this.agenda = agenda;
        this.companyId = companyId;
        this.adminId = adminId;
        this.sqlDate = sqlDate;
        this.sqlTime = sqlTime;
        this.uIds = uIds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAgenda() {
        return agenda;
    }

    public void setAgenda(String agenda) {
        this.agenda = agenda;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getSqlDate() {
        return sqlDate;
    }

    public void setSqlDate(String sqlDate) {
        this.sqlDate = sqlDate;
    }

    public String getSqlTime() {
        return sqlTime;
    }

    public void String (String sqlTime) {
        this.sqlTime = sqlTime;
    }

    public List<Integer> getuIds() {
        return uIds;
    }

    public void setuIds(List<Integer> uIds) {
        this.uIds = uIds;
    }
}
