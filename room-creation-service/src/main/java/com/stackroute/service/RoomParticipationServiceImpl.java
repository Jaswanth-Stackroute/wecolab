package com.stackroute.service;


import com.stackroute.domain.RoomParticipant;
import com.stackroute.exception.DataBaseNotFoundException;
import com.stackroute.repository.RoomParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Primary
public class RoomParticipationServiceImpl implements RoomParticipantService {
    private RoomParticipantRepository roomParticipantRepository;

    @Autowired
    public RoomParticipationServiceImpl(  RoomParticipantRepository roomParticipantRepository) {
        System.out.println("Inside actual impl");
        this.roomParticipantRepository=roomParticipantRepository;
    }

    @Override
    public RoomParticipant saveRoomParticipant(RoomParticipant room_participant) throws DataBaseNotFoundException {
        if(roomParticipantRepository.existsById(room_participant.getId()))
            throw new DataBaseNotFoundException("room id is already exists");
        RoomParticipant savedRoomParticipant = roomParticipantRepository.save(room_participant);
        if(savedRoomParticipant == null)
            throw new DataBaseNotFoundException("room id is already exists");
        return savedRoomParticipant;
    }

    @Override
    public List<RoomParticipant> getAllRoomParticipationDetails() throws DataBaseNotFoundException {
        return roomParticipantRepository.findAll();
    }

    @Override
    public List<RoomParticipant> getRoomParticipationDetailsByUserId(int userId) throws DataBaseNotFoundException {
        List<RoomParticipant>list= roomParticipantRepository.findRoomParticipationByUserId(userId);
        return list;
    }

    @Override
    public List<RoomParticipant> getRoomRoomParticipationDetailsByRoomId(int roomId) throws DataBaseNotFoundException {
        List<RoomParticipant>list= roomParticipantRepository.findRoomParticipationByRoomId(roomId);
        return list;
    }

    @Override
    public String deleteByRoomId(int roomId) throws DataBaseNotFoundException {
        try
        {
            roomParticipantRepository.deleteRoomParticipationByRoomId(roomId);
            return "deleted successfully";
        }
        catch (Exception e)
        {
            throw  new DataBaseNotFoundException("Databse not found");
        }
    }
    @Override
    public String deleteByUserId(int userId) throws DataBaseNotFoundException {
            roomParticipantRepository.deleteRoomParticipationByUserId(userId);
            return "deleted successfully";
    }

}