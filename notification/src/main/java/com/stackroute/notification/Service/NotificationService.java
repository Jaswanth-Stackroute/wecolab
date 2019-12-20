//package com.stackroute.notification.Service;
//
//import com.stackroute.notification.Model.RoomMeetingDetail;
//
//public interface NotificationService {
//    void sendMeetingDetails(RoomMeetingDetail roomMeetingDetail);
//}

package com.stackroute.notification.Service;

import com.stackroute.notification.Model.RoomMeetingDetail;

import javax.mail.MessagingException;
import java.io.IOException;

public interface NotificationService {
    void sendMeetingDetails(RoomMeetingDetail roomMeetingDetail) throws IOException, MessagingException;
}
