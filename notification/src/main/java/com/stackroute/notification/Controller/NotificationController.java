//package com.stackroute.notification.Controller;
//
//import com.stackroute.notification.Model.RoomMeetingDetail;
//import com.stackroute.notification.Service.NotificationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@CrossOrigin(origins = "*")
//@RequestMapping("/notification")
//public class NotificationController {
//
//    @Autowired
//    private NotificationService notificationService;
//    private RoomMeetingDetail roomMeetingDetail;
//
//    @PostMapping()
//    public String sendMeetingDetails(@RequestBody RoomMeetingDetail roomMeetingDetail){
//        System.out.println("this is starting");
//        notificationService.sendMeetingDetails(roomMeetingDetail);
//        System.out.println("this is working");
//
//        return "sent successfully";
//    }
//}
package com.stackroute.notification.Controller;

import com.stackroute.notification.Model.RoomMeetingDetail;
import com.stackroute.notification.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    private RoomMeetingDetail roomMeetingDetail;

    @PostMapping()
    public String sendMeetingDetails(@RequestBody RoomMeetingDetail roomMeetingDetail) throws IOException, MessagingException {
//        System.out.println("this is starting");
        notificationService.sendMeetingDetails(roomMeetingDetail);
//        System.out.println("this is working");

        return "sent successfully";
    }
}