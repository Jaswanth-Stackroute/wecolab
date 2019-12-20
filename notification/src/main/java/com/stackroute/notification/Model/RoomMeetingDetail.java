//package com.stackroute.notification.Model;
//
//import java.util.List;
//
//public class RoomMeetingDetail {
//    private String time;
//    private String date;
//    private String roomCreator;
//    private List<String> emails;
//    private String roomDescription;
//    private String roomName;
//
//    public RoomMeetingDetail(String time, String date, String roomCreator, List<String> emails, String roomDescription, String roomName) {
//        this.time = time;
//        this.date = date;
//        this.roomCreator = roomCreator;
//        this.emails = emails;
//        this.roomDescription = roomDescription;
//        this.roomName = roomName;
//    }
//
//    @Override
//    public String toString() {
//        return "RoomMeetingDetail{" +
//                "time='" + time + '\'' +
//                ", date='" + date + '\'' +
//                ", roomCreator='" + roomCreator + '\'' +
//                ", emails=" + emails +
//                ", roomDescription='" + roomDescription + '\'' +
//                ", roomName='" + roomName + '\'' +
//                '}';
//    }
//
//    public String getTime() {
//        return time;
//    }
//
//    public void setTime(String time) {
//        this.time = time;
//    }
//
//    public String getDate() {
//        return date;
//    }
//
//    public void setDate(String date) {
//        this.date = date;
//    }
//
//    public String getRoomCreator() {
//        return roomCreator;
//    }
//
//    public void setRoomCreator(String roomCreator) {
//        this.roomCreator = roomCreator;
//    }
//
//    public List<String> getEmails() {
//        return emails;
//    }
//
//    public void setEmails(List<String> emails) {
//        this.emails = emails;
//    }
//
//    public String getRoomDescription() {
//        return roomDescription;
//    }
//
//    public void setRoomDescription(String roomDescription) {
//        this.roomDescription = roomDescription;
//    }
//
//    public String getRoomName() {
//        return roomName;
//    }
//
//    public void setRoomName(String roomName) {
//        this.roomName = roomName;
//    }
//}

package com.stackroute.notification.Model;

import java.util.List;

public class RoomMeetingDetail {
    private String time;
    private String date;
    private String roomCreator;
    private List<String> emails;
    private String roomDescription;
    private String roomName;

    public RoomMeetingDetail(String time, String date, String roomCreator, List<String> emails, String roomDescription, String roomName) {
        this.time = time;
        this.date = date;
        this.roomCreator = roomCreator;
        this.emails = emails;
        this.roomDescription = roomDescription;
        this.roomName = roomName;
    }

    @Override
    public String toString() {
        return "RoomMeetingDetail{" +
                "time='" + time + '\'' +
                ", date='" + date + '\'' +
                ", roomCreator='" + roomCreator + '\'' +
                ", emails=" + emails +
                ", roomDescription='" + roomDescription + '\'' +
                ", roomName='" + roomName + '\'' +
                '}';
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getRoomCreator() {
        return roomCreator;
    }

    public void setRoomCreator(String roomCreator) {
        this.roomCreator = roomCreator;
    }

    public List<String> getEmails() {
        return emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }

    public String getRoomDescription() {
        return roomDescription;
    }

    public void setRoomDescription(String roomDescription) {
        this.roomDescription = roomDescription;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
