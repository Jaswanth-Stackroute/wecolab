package com.stackroute.service;



import com.stackroute.domain.RoomParticipant;
import com.stackroute.exception.DataBaseNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface RoomParticipantService {
    public RoomParticipant saveRoomParticipant(RoomParticipant room_participant) throws DataBaseNotFoundException;

    public List<RoomParticipant> getAllRoomParticipationDetails() throws DataBaseNotFoundException;

    public  List<RoomParticipant> getRoomParticipationDetailsByUserId(int userId) throws DataBaseNotFoundException;

    public  List<RoomParticipant> getRoomRoomParticipationDetailsByRoomId(int roomId) throws DataBaseNotFoundException;

    public String deleteByRoomId(int roomId) throws DataBaseNotFoundException;

    public String deleteByUserId(int roomId) throws DataBaseNotFoundException;



}
