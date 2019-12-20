package com.stackroute.multicasting.Service;


import com.stackroute.multicasting.domain.Group;
import com.stackroute.multicasting.domain.GroupDetails;
import com.stackroute.multicasting.domain.Message;
import com.stackroute.multicasting.domain.User;
import com.stackroute.multicasting.repository.GroupDetailsRepository;
import com.stackroute.multicasting.repository.GroupRepository;
import com.stackroute.multicasting.repository.MessageRepository;
import com.stackroute.multicasting.repository.UserRepository;
import com.stackroute.multicasting.services.MessageServiceImplementation;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class MessageServiceTest {

    private User user;


    @Mock
    private UserRepository userRepository;
    @Mock
    private MessageRepository messageRepository;
    @Mock
    private GroupRepository groupRepository;
    @Mock
    private GroupDetailsRepository groupDetailsRepository;



    @InjectMocks
    private MessageServiceImplementation messageService;
    private List<Group> groupList= null;
    private List<User> list= null;
    private List<Message> messageList= null;
    private Group group=new Group();
    private GroupDetails groupDetails=new GroupDetails();

    @Before
    public void setUp(){
        //Initialising the mock object
        MockitoAnnotations.initMocks(this);
        user = new User();
       user.setName("john");
       user.setId(12);
       user.setCompanyId(1223);
       user.setEmail("hello@gmail.com");
       user.setPhone((long) 2134567897);
        list = new ArrayList<>();
        list.add(user);
    }


    @Test
    public void saveMessage() {
        when(messageRepository.save((Message) any())).thenReturn(new Message((long)31234,27017,27027,"3-12-2001","hello",true));
        Message savedMessage = messageService.saveMessage(new Message((long)31234,27017,27027,"3-12-2001","hello",true));
        Assert.assertEquals(new Message((long)31234,27017,27027,"3-12-2001","hello",true),savedMessage);
    }

    @Test
    public void addGroup() {
        when(groupRepository.save((Group) any())).thenReturn(group);
        Group savedGroup=messageService.addGroup(group);
        Assert.assertEquals(savedGroup,group);
    }

    @Test
    public void createGroup() {
        when(groupDetailsRepository.save((GroupDetails) any())).thenReturn(groupDetails);
        GroupDetails savedGroupDetails=messageService.createGroup(groupDetails);
        Assert.assertEquals(savedGroupDetails,groupDetails);
    }


    @Test
    public void findGroupMessages() {
        when(messageRepository.findBytoId(1234,112)).thenReturn(messageList);
        List<Message> messagelist=messageService.findGroupMessages(1234,112);
        Assert.assertEquals(messagelist,messageList);

    }

}
