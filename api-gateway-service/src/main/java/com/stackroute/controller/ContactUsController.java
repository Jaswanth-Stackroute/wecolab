package com.stackroute.controller;

import com.stackroute.model.ContactUsReq;
import com.stackroute.model.Mail;
import com.stackroute.services.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1")
public class ContactUsController {

    @Autowired
    EmailSenderService emailSenderService;

    @PostMapping("/contactUs")
    public ResponseEntity<?> contactUs(@RequestBody ContactUsReq contactUs) throws IOException, MessagingException {
        Mail mail = new Mail();
        mail.setFrom(contactUs.getEmailId());
        mail.setTo("team.wecolab@gmail.com");
        mail.setSubject("Support for "+contactUs.getIssue());
        mail.setTemplate("contactUs");


        Map<String, Object> model = new HashMap<String, Object>();
        model.put("issue",contactUs.getIssue());
        model.put("emailId", contactUs.getEmailId());
        model.put("message", contactUs.getMessage());
        model.put("firstName", contactUs.getFirstName());
        model.put("lastName",contactUs.getLastName());
        model.put("phone",contactUs.getPhone());
        mail.setModel(model);

        emailSenderService.sendSimpleMessage(mail);

        return new ResponseEntity<String>("Message sent successfully. We will be in touch in shortly", HttpStatus.OK);
    }
}
