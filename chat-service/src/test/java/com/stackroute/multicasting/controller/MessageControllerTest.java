package com.stackroute.multicasting.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.multicasting.domain.User;
import com.stackroute.multicasting.services.MessageService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

public class MessageControllerTest {

    @Autowired
    private MockMvc mockMvc;
    private User user;
    @MockBean
    private MessageService messageService;
    @InjectMocks
    private MessageController messageController;

    private List<User> list =null;

    @Before
    public void setUp(){

        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(messageController).build();
        user = new User();
        user.setName("john");
        user.setId(12);
        user.setCompanyId(1223);
        user.setEmail("hello@gmail.com");
        user.setPhone((long) 2134567897);
        list = new ArrayList();
        list.add(user);
    }

//    @Test
//    public void getUsers() throws Exception{
//        when(messageService.getAllUsers()).thenReturn(list);
//        mockMvc.perform(MockMvcRequestBuilders.get("/usersList")
//                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print());
//
//    }

    private static String asJsonString(final Object obj)
    {
        try{
            return new ObjectMapper().writeValueAsString(obj);

        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}
