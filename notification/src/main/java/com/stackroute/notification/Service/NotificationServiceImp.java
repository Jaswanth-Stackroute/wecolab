//package com.stackroute.notification.Service;
//
//import com.stackroute.notification.Model.RoomMeetingDetail;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.stereotype.Service;
//
//@Service
//public class NotificationServiceImp implements NotificationService{
//
//    @Autowired
//    EmailSenderService emailSenderService;
//
//    @Override
//    public void sendMeetingDetails(RoomMeetingDetail roomMeetingDetail) {
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        int i=0;
//        for(String email:roomMeetingDetail.getEmails()){
//            if (i==0) {
//                i++;
//                mailMessage.setTo(email);
//            }else mailMessage.setCc(email);
//        }
//        mailMessage.setSubject("Invitation to the "+roomMeetingDetail.getRoomName()+" meeting");
//        mailMessage.setFrom(roomMeetingDetail.getRoomCreator());
//        mailMessage.setText("Hi \nYou are invited to attend the meeting.\n\tDescription:\n"+
//                roomMeetingDetail.getRoomDescription()
//                + "\nThe meeting is scheduled at " + roomMeetingDetail.getDate()
//                + " " + roomMeetingDetail.getTime() );
//
//        emailSenderService.sendEmail(mailMessage);
//
//    }
//}

package com.stackroute.notification.Service;

import com.stackroute.notification.Model.Mail;
import com.stackroute.notification.Model.RoomMeetingDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationServiceImp implements NotificationService{

    @Autowired
    EmailSenderService emailSenderService;

    @Override
    public void sendMeetingDetails(RoomMeetingDetail roomMeetingDetail) throws IOException, MessagingException {

        Mail mail = new Mail();
        mail.setFrom(roomMeetingDetail.getRoomCreator());
        mail.setSubject("Invitation to the "+roomMeetingDetail.getRoomName()+" meeting");
        mail.setTemplate("notification");
        mail.setEmails(roomMeetingDetail.getEmails());

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("time",roomMeetingDetail.getTime());
        model.put("date",roomMeetingDetail.getDate());
        model.put("roomCreator", roomMeetingDetail.getRoomCreator());
        model.put("roomName", roomMeetingDetail.getRoomName());
        model.put("roomDescription", roomMeetingDetail.getRoomDescription());
        mail.setModel(model);
//        int i=0;
//        for(String email:roomMeetingDetail.getEmails()){
//            if (i==0) {
//                i++;
//                mail.setTo(email);
//            }else mail.setCc(email);
//        }
//        mailMessage.setSubject("Invitation to the "+roomMeetingDetail.getRoomName()+" meeting");
//        mailMessage.setFrom(roomMeetingDetail.getRoomCreator());
//        mailMessage.setText("Hi \nYou are invited to attend the meeting.\n\tDescription:\n"+
//                roomMeetingDetail.getRoomDescription()
//                + "\nThe meeting is scheduled at " + roomMeetingDetail.getDate()
//                + " " + roomMeetingDetail.getTime() );
//
//        emailSenderService.sendSimpleMessage(mailMessage);


        try{
        emailSenderService.sendSimpleMessage(mail);}
        catch (Exception e){
            System.out.printf(e.toString());
        }
    }
}
