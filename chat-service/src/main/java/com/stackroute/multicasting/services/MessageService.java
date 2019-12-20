package com.stackroute.multicasting.services;

import com.stackroute.multicasting.domain.*;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;


public interface MessageService{

    List<User> getAllUsers();

    Message saveMessage(Message message);

    List<Integer> findMembersOfGroup(int groupId);

    Group addGroup(Group group);

    GroupDetails createGroup(GroupDetails groupDetails);

    List<GroupDetails> findUserGroups1(int teamId,int userId);

    List<Message> findAllMessages(int fromId);

    List<Message> findGroupMessages(int groupId,int fromId);

    void deleteMembersOfGroup(int groupId,int userId);

    GroupDetails updateGroup(GroupDetails groupDetails);

    Notification addNotification(Notification notification);

    List<Notification> findNotifications(int toId);

    void deleteNotification(Long id);

    Notification findByConversationId(Long Id);

    List<GroupDetails> findByTeamId(int teamId,int userId);

    List<Message> findGroupMessages(int groupId);

}
