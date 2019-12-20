package com.stackroute.controller;

import com.stackroute.domain.*;
import com.stackroute.exception.DataBaseNotFoundException;
import com.stackroute.service.RoomParticipantService;
import com.stackroute.service.RoomService;
import com.stackroute.service.RoomSorter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

@PropertySources({
        @PropertySource(value = "classpath:application.properties")
})

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v1")
public class ConferenceRoomController {

    private RoomService roomService;
    private RoomParticipantService roomParticipantService;

    @Autowired
    public ConferenceRoomController(RoomService roomService, RoomParticipantService roomParticipantService) {

        this.roomService = roomService;
        this.roomParticipantService = roomParticipantService;

        // Auto delete room : duration in milli seconds
        final long timeInterval = 900000;
        Runnable runnable = new Runnable() {
            public void run() {
                while (true) {
                    try {
                        deleteRoomAuto();
                        Thread.sleep(timeInterval);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        Thread thread = new Thread(runnable);
        thread.start();
    }

    /* create new resource -- saveRoom*/
    @PostMapping("/saveRoom")
    public ResponseEntity<?> saveRoom(@RequestBody Room room) throws DataBaseNotFoundException {
            return new ResponseEntity<Room>(roomService.saveRoom(room), HttpStatus.CREATED);
    }

    /* create new resource -- saveRoomAndUser*/
    @PostMapping(value = "/saveRoomAndUsers", consumes = "application/json")
    public ResponseEntity<?> saveRoomandParticipant(@RequestBody RoomUser roomUser) throws DataBaseNotFoundException{
            Room room = new Room();
            room.setName(roomUser.getName());
            room.setAdminId(roomUser.getAdminId());
            room.setAgenda(roomUser.getAgenda());
            String date1 = roomUser.getSqlDate();
            Date date = Date.valueOf(date1);
            room.setSqlDate(date);
            room.setCompanyId(roomUser.getCompanyId());
            String time11 = roomUser.getSqlTime();
            Time time = Time.valueOf(time11);
            room.setSqlTime(time);
            // set url
            String url= roomService.getRoomUrl();
            room.setUrl(url);
            roomService.saveRoom(room);
            /* 2nd part*/
            RoomLink roomLink=new RoomLink();
            roomLink.setId(room.getId());
            roomLink.setName(room.getName());
            roomLink.setAgenda(room.getAgenda());
            roomLink.setCompanyId(room.getCompanyId());
            roomLink.setAdminId(room.getAdminId());
            roomLink.setSqlDate(room.getSqlDate());
            roomLink.setSqlTime(room.getSqlTime());
            roomLink.setUrl(room.getUrl());

            List<Integer> userIds = roomUser.getuIds();
            roomLink.setRoomUser(userIds);
            for (int i = 0; i < userIds.size(); i++) {
                RoomParticipant roomParticipant = new RoomParticipant();
                roomParticipant.setRoomId(room.getId());
                roomParticipant.setUserId(userIds.get(i));
                roomParticipantService.saveRoomParticipant(roomParticipant);
            }
            return new ResponseEntity<RoomLink>(roomLink, HttpStatus.CREATED);
    }

    /*  Show all resources */
    @GetMapping("/getAllRoom")
    public ResponseEntity<?> getAllRoom() throws DataBaseNotFoundException {

        return new ResponseEntity<List<Room>>(roomService.getAllRoom(), HttpStatus.OK);
    }

    /* Find room Details by company id */
    @GetMapping("getRoomByCompanyId/{companyId}")
    public ResponseEntity<?> getRoomByName(@PathVariable int companyId) throws Exception {
        try {
            return new ResponseEntity<List<Room>>(roomService.getRoomByCompanyId(companyId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    /* create new resource -- post*/
    @PostMapping("/saveRoomParticipation")
    public ResponseEntity<?> saveRoom(@RequestBody RoomParticipant roomParticipant) throws DataBaseNotFoundException {
            return new ResponseEntity<RoomParticipant>(roomParticipantService.saveRoomParticipant(roomParticipant), HttpStatus.CREATED);

    }

    /*  Show all room participant */
    @GetMapping("/getAllRoomParticipant")
    public ResponseEntity<?> getAllRoomParticipation() throws DataBaseNotFoundException {

        return new ResponseEntity<List<RoomParticipant>>(roomParticipantService.getAllRoomParticipationDetails(), HttpStatus.OK);
    }

    /* Find given resource by room id */
    @GetMapping("getRoomParticipantByRoomId/{roomId}")
    public ResponseEntity<?> getRoomParticipantByRoomId(@PathVariable int roomId) throws DataBaseNotFoundException{
            return new ResponseEntity<List<RoomParticipant>>(roomParticipantService.getRoomRoomParticipationDetailsByRoomId(roomId), HttpStatus.OK);

    }

    /* Find given resource by user id */
    @GetMapping("getRoomParticipantByUserId/{userId}")
    public ResponseEntity<?> getRoomParticipantByUserId(@PathVariable int userId) throws Exception {
            List<RoomParticipant> roomParticipantList = roomParticipantService.getRoomParticipationDetailsByUserId(userId);
            int listSize = roomParticipantList.size();
            List<Room> roomList = new ArrayList<>();
            List<RoomLink> roomLinkList = new ArrayList<>();
            for (int i = 0; i < listSize; i++) {
                roomList.add(roomService.roomDetails(roomParticipantList.get(i).getRoomId()));
            }
            for (int i = 0; i < listSize; i++) {
                List<RoomParticipant> roomParticipantList2 = roomParticipantService.getRoomRoomParticipationDetailsByRoomId(roomParticipantList.get(i).getRoomId());
                List<Integer> userList = new ArrayList<>();

                for (int j = 0; j < roomParticipantList2.size(); j++) {

                    int id = roomParticipantList2.get(j).getUserId();
                    userList.add(id);
                }
                /* create new roomLink*/
                RoomLink roomLink = new RoomLink();
                roomLink.setRoomUser(userList);
                roomLink.setId(roomList.get(i).getId());
                roomLink.setName(roomList.get(i).getName());
                roomLink.setAgenda(roomList.get(i).getAgenda());
                roomLink.setCompanyId(roomList.get(i).getCompanyId());
                roomLink.setAdminId(roomList.get(i).getAdminId());
                roomLink.setSqlDate(roomList.get(i).getSqlDate());
                roomLink.setSqlTime(roomList.get(i).getSqlTime());
                roomLink.setUrl(roomList.get(i).getUrl());
                roomLinkList.add(roomLink);
            }
        Collections.sort(roomLinkList, new RoomSorter());
            return new ResponseEntity<List<RoomLink>>(roomLinkList, HttpStatus.OK);
    }

    /* Find given resource by company id */
    @GetMapping("getRoomParticipantByCompanyId/{companyId}")
    public ResponseEntity<?> getRoomParticipantByCompanyId(@PathVariable int companyId) throws DataBaseNotFoundException {
            List<Room> roomList = roomService.getRoomByCompanyId(companyId);
            List<RoomLink> roomLinkList = new ArrayList<>();
            for (int i = 0; i < roomList.size(); i++) {
                RoomLink roomLink = new RoomLink();
                roomLink.setId(roomList.get(i).getId());
                roomLink.setName(roomList.get(i).getName());
                roomLink.setAgenda(roomList.get(i).getAgenda());
                roomLink.setCompanyId(roomList.get(i).getCompanyId());
                roomLink.setAdminId(roomList.get(i).getAdminId());
                roomLink.setSqlDate(roomList.get(i).getSqlDate());
                roomLink.setSqlTime(roomList.get(i).getSqlTime());
                roomLink.setUrl(roomList.get(i).getUrl());
                List<Integer> userList1 = new ArrayList<>();
                int roomId = roomList.get(i).getId();
                List<RoomParticipant> roomParticipantList = roomParticipantService.getRoomRoomParticipationDetailsByRoomId(roomId);
                for (int j = 0; j < roomParticipantList.size(); j++) {
                    int userId = roomParticipantList.get(j).getUserId();
                    userList1.add(userId);
                }
                roomLink.setRoomUser(userList1);
                roomLinkList.add(roomLink);
            }
            return new ResponseEntity<List<RoomLink>>(roomLinkList, HttpStatus.OK);
    }

    /* Delete roomParticipant by userId */
    @DeleteMapping("/deleteRoomParticipant/{userId}")
    public ResponseEntity deleteRoomParticipant(@PathVariable int userId) throws DataBaseNotFoundException {
            String msg = roomParticipantService.deleteByUserId(userId);
            return new ResponseEntity<>("deleted successfully", HttpStatus.OK);
    }

    /* Delete room and roomparticipant by roomId */
    @DeleteMapping("/deleteRoom/{roomId}")
    public ResponseEntity deleteRoom(@PathVariable int roomId) throws DataBaseNotFoundException {
            String msg = roomParticipantService.deleteByRoomId(roomId);
            Room room = roomService.deleteById(roomId);
            return new ResponseEntity<>(room, HttpStatus.OK);
    }

    /* Delete room automatically*/
    public void deleteRoomAuto() throws DataBaseNotFoundException {
        try {
            List<Room> roomList = roomService.getAllRoom();
            for (int i = 0; i < roomList.size(); i++) {
                java.sql.Date sqlDate = roomList.get(i).getSqlDate();
                java.sql.Time sqlTime = roomList.get(i).getSqlTime();
                Date date = Date.valueOf(LocalDate.now());
                long diff = date.getTime() - sqlDate.getTime(); // in milli second
                diff = diff / (1000 * 60 * 60 * 24); // convert into days
                if (diff >= 1) {
                    int roomId = roomList.get(i).getId();
                    String msg = roomParticipantService.deleteByRoomId(roomId);
                    Room room = roomService.deleteById(roomId);
                }
            }
        } catch (DataBaseNotFoundException e) {
            System.out.println("Try Again");
        }
    }

}
