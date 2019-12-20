package com.stackroute.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
//@AllArgsConstructor
@Builder
@Entity
@Table
public class CustomerDetail {

    @Id
    private String cusId;
    private String cusEmail;
    private String cusName;

    private LocalDateTime timeStamp;
    private int amount;

    public CustomerDetail(String cusId, String cusEmail, String cusName, LocalDateTime timeStamp, int amount) {
        this.cusId = cusId;
        this.cusEmail = cusEmail;
        this.cusName = cusName;
        this.timeStamp = timeStamp;
        this.amount = amount;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCusEmail() {
        return cusEmail;
    }

    public void setCusEmail(String cusEmail) {
        this.cusEmail = cusEmail;
    }

    public String getCusId() {
        return cusId;
    }

    public void setCusId(String cusId) {
        this.cusId = cusId;
    }

    public String getCusName() {
        return cusName;
    }

    public void setCusName(String cusName) {
        this.cusName = cusName;
    }

}
