package com.stackroute.multicasting.services;


import com.stackroute.multicasting.domain.*;
import com.stackroute.multicasting.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImplementation implements MessageService{

    private GroupRepository groupRepository;
    private MessageRepository messageRepository;
    private UserRepository userRepository;
    private GroupDetailsRepository groupDetailsRepository;
    private NotificationRepository notificationRepository;

    @Autowired
    public MessageServiceImplementation(GroupRepository groupRepository, MessageRepository messageRepository, UserRepository userRepository,GroupDetailsRepository groupDetailsRepository,NotificationRepository notificationRepository) {
        this.groupRepository = groupRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.groupDetailsRepository = groupDetailsRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public Message saveMessage(Message message) {
        return this.messageRepository.save(message);
    }

    @Override
    public List<Integer> findMembersOfGroup(int groupId) {
        List<Group> groupParticipants= this.groupRepository.findByGroupId(groupId);
        List<Integer> users = new ArrayList<>();
        for(Group group:groupParticipants){
               users.add(group.getUserId());
        }
        return users;
    }


    @Override
    public GroupDetails createGroup(GroupDetails groupDetails) {
        return this.groupDetailsRepository.save(groupDetails);
    }

    @Override
    public Group addGroup(Group group) {
        return this.groupRepository.save(group);
    }

    @Override
    public List<GroupDetails> findUserGroups1(int teamId,int userId) {
        List<GroupDetails> groupDetails = new ArrayList<>();
        for(Group group:this.groupRepository.findByUserId(userId)){
            groupDetails.add(this.groupDetailsRepository.findByTeamIdAndId(teamId,group.getGroupId()));
        }
        return groupDetails;
    }

    @Override
    public List<Message> findAllMessages(int fromId) {
        List<Message> messageList = this.messageRepository.findByFromIdOrToId(fromId, fromId);
        for(Group group:this.groupRepository.findByUserId(fromId)){
            messageList.addAll(this.messageRepository.findBytoId(group.getGroupId(),fromId));
        }
        return messageList;
    }

    @Override
    public List<Message> findGroupMessages(int groupId,int fromId) {
        return this.messageRepository.findBytoId(groupId,fromId);
    }

    @Override
    public void deleteMembersOfGroup(int groupId, int userId) {
        this.groupRepository.deleteGroupByUserIdAndGroupId(userId,groupId);
    }

    @Override
    public GroupDetails updateGroup(GroupDetails groupDetails) {
        return this.groupDetailsRepository.save(groupDetails);
    }

    @Override
    public Notification addNotification(Notification notification) {
        return this.notificationRepository.save(notification);
    }

    @Override
    public List<Notification> findNotifications(int toId) {
        return this.notificationRepository.findByToId(toId);
    }

    @Override
    public void deleteNotification(Long id) {
        this.notificationRepository.deleteByConversationId(id);
    }

    @Override
    public Notification findByConversationId(Long id){ return  this.notificationRepository.findByConversationId(id); }

    @Override
    public List<GroupDetails> findByTeamId(int teamId,int userId) {
        List<Group> groups = this.groupRepository.findByUserId(userId);
        List<GroupDetails> groupDetails = this.groupDetailsRepository.findByTeamId(teamId);
        return groupDetails.stream().filter( groupDetails1 -> {
            for (Group group : groups) {
                if(group.getGroupId() == groupDetails1.getId()){

                    return false;
                }
            }
            return true;
        }).collect(Collectors.toList());
    }

    @Override
    public List<Message> findGroupMessages(int groupId) {
        return this.messageRepository.findByToId(groupId);
    }
}
