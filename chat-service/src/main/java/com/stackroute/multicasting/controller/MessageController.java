package com.stackroute.multicasting.controller;


import com.stackroute.multicasting.domain.*;
import com.stackroute.multicasting.services.FileService;
import com.stackroute.multicasting.services.FileServiceAwsImpl;
import com.stackroute.multicasting.services.MessageServiceImplementation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Controller
@CrossOrigin
public class MessageController {

    private static final Logger LOGGER= LoggerFactory.getLogger(MessageController.class);
    private SimpMessagingTemplate template;
    private MessageServiceImplementation messageService;
    private FileService fileService;
    private FileServiceAwsImpl fileServiceAws;

    @Autowired
    public MessageController(SimpMessagingTemplate template, MessageServiceImplementation messageService, FileService fileService, FileServiceAwsImpl fileServiceAws) {
        this.template = template;
        this.messageService = messageService;
        this.fileService = fileService;
        this.fileServiceAws=fileServiceAws;
    }

    @MessageMapping("/login")
    public void login(@Payload User user) {
        LOGGER.info( user.getName() + " connected to the chat service");
        template.convertAndSend("/message/allGroups/" + user.getId(),messageService.findUserGroups1(user.getCompanyId(),user.getId()));
        template.convertAndSend("/message/" + user.getId(), messageService.findAllMessages(user.getId()));
        // template.convertAndSend("/message/file/"+user.getId(),fileService.findAllFiles(user.getId()));
        template.convertAndSend("/message/notification/" + user.getId(),messageService.findNotifications(user.getId()));
        template.convertAndSend("/message/file/"+user.getId(),fileServiceAws.findAllFiles(user.getId()));
        LOGGER.info("successfully sent all files and messages to " + user.getName());
    }

    @MessageMapping("/chat.sendMessage/{fromId}/{toId}")
    public void sendMessage(@DestinationVariable int fromId, @DestinationVariable int toId, @Payload Message message) {
        LOGGER.info("Message received from" + fromId + "to" + toId );
        this.messageService.saveMessage(message);
        if (fromId != toId) {
            template.convertAndSend("/message/" + toId, message);
        }
        LOGGER.info("Message sent to" + toId + "from" + fromId);
    }


    @MessageMapping("/chat.groupMessage/{groupId}")
    public void groupMessage(@DestinationVariable int groupId, @Payload Message message) {
        LOGGER.info("Message received in" + groupId );
        this.messageService.saveMessage(message);
        List<Integer> userIds = messageService.findMembersOfGroup(groupId);
        for (int userId : userIds) {
            if (userId != message.getFromId())
                template.convertAndSend("/message/" + userId, message);
        }
        LOGGER.info("Message sent to all users in" + groupId );
    }

    @MessageMapping("/chat.newGroup")
    public void createGroup(@Payload GroupDetails groupDetails) {
        LOGGER.info("new group create request has been received with name" + groupDetails.getName());
        this.messageService.createGroup(groupDetails);
        this.messageService.addGroup(new Group(groupDetails.getId(),groupDetails.getAdminId()));
        template.convertAndSend("/message/allGroups/" + groupDetails.getAdminId(), messageService.findUserGroups1(groupDetails.getTeamId(),groupDetails.getAdminId()));
        LOGGER.info("new group has been created with name" + groupDetails.getName());
    }


    @PostMapping("/joinGroup/{teamId}")
    public ResponseEntity<String> joinGroup(@PathVariable int teamId,@RequestBody Group group) {
        LOGGER.info("a new request has been sent by " + group.getUserId() +"to join in group" + group.getGroupId());
        this.messageService.addGroup(group);
        template.convertAndSend("/message/allGroups/"+group.getUserId(),messageService.findUserGroups1(teamId,group.getUserId()));
        template.convertAndSend("/message/" + group.getUserId(),messageService.findGroupMessages(group.getGroupId(),group.getUserId()));
        LOGGER.info(group.getUserId() +"has joined" + group.getGroupId());
        return new ResponseEntity<>("user sucessfully added to group",HttpStatus.OK);
    }

    @GetMapping("/usersList")
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(this.messageService.getAllUsers(),HttpStatus.OK);
    }

    @GetMapping("/usersList/{groupId}")
    public ResponseEntity<List<Integer>> getUsersOfGroup(@PathVariable int groupId) {
        LOGGER.info("Get all users of group" + groupId);
        return new ResponseEntity<>(this.messageService.findMembersOfGroup(groupId), HttpStatus.OK);
    }

    @PostMapping("/groupList/{teamId}")
    public ResponseEntity<String> deleteUserOfGroup(@PathVariable int teamId,@RequestBody Group group) {
        this.messageService.deleteMembersOfGroup(group.getGroupId(),group.getUserId());
        template.convertAndSend("/message/allGroups/" + group.getUserId(), messageService.findUserGroups1(teamId,group.getUserId()));
        LOGGER.info(group.getUserId() + "left" + group.getGroupId());
        return new ResponseEntity<>("deleted",HttpStatus.OK);
    }

    @PutMapping("/group/edit")
    public ResponseEntity<GroupDetails> updateGroupDetails(@RequestBody GroupDetails groupDetails){
        LOGGER.info("Group details has been edited" + groupDetails.getName());
        return new ResponseEntity<>(this.messageService.updateGroup(groupDetails),HttpStatus.OK);
    }

    @PostMapping("/group/invitation")
    public ResponseEntity<Notification> addNotification(@RequestBody Notification notification){
        Notification notification1 = this.messageService.addNotification(notification);
        template.convertAndSend("/message/notification/" + notification.getToId(),messageService.findNotifications(notification.getToId()));
        LOGGER.info(notification.getToId() + "has been invited to join" + notification.getGroupName());
        return new ResponseEntity<>(notification1,HttpStatus.OK);
    }

    @GetMapping("/group/deleteInvitation/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long id){
        Notification notification = this.messageService.findByConversationId(id);
        this.messageService.deleteNotification(id);
        template.convertAndSend("/message/notification/" + notification.getToId(),messageService.findNotifications(notification.getToId()));
        LOGGER.info(notification.getToId() + "has rejected invitation to join" + notification.getGroupName());
        return new ResponseEntity<>("success!!",HttpStatus.OK);
    }

    @GetMapping("/owner/allGroups/{teamId}/{userId}")
    public ResponseEntity<List<GroupDetails>> findGroupDetails(@PathVariable int teamId,@PathVariable int userId){
        return new ResponseEntity<>(this.messageService.findByTeamId(teamId, userId),HttpStatus.OK);
    }

    @GetMapping("/owner/groupMessages/{groupId}")
    public ResponseEntity<List<Message>> findGroupMessages(@PathVariable int groupId){
        return new ResponseEntity<>(this.messageService.findGroupMessages(groupId),HttpStatus.OK);
    }
}
