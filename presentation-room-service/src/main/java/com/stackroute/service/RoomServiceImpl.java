package com.stackroute.service;

import com.stackroute.domain.Room;
import com.stackroute.exception.DataBaseNotFoundException;
import com.stackroute.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Primary
// mvn clean
// mvn spring-boot:run -Dspring.profiles.active=dummy
public class RoomServiceImpl implements RoomService {
    private RoomRepository roomRepository;
    @Value("${IP}")
    private String IP;
    @Value("${PORT}")
    private String PORT;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository) {
        System.out.println("Inside actual impl");
        this.roomRepository=roomRepository;
    }



    @Override
    public Room saveRoom(Room room ) throws DataBaseNotFoundException {
        if(roomRepository.existsById(room.getId()))
            throw new DataBaseNotFoundException("User id is already exists");
        Room savedRoom= roomRepository.save(room);
        if(savedRoom == null)
            throw new DataBaseNotFoundException("Track id is already exists");
        return savedRoom;
    }

    @Override
    public List<Room> getAllRoom() throws DataBaseNotFoundException {
        return roomRepository.findAllRoom();
    }

    @Override
    public List<Room> getRoomByCompanyId(int companyId) throws DataBaseNotFoundException {
        List<Room>list= roomRepository.findBycompanyId(companyId);
        return list;
    }

    @Override
    public Room roomDetails(int roomId) throws DataBaseNotFoundException
    { if(!roomRepository.existsById(roomId))
        throw new DataBaseNotFoundException("roomId not found");
      Room room = roomRepository.findByRoomId(roomId);
      return room;
    }

    @Override
    public Room deleteById(int roomId) throws DataBaseNotFoundException {
        if(!roomRepository.existsById(roomId))
            throw new DataBaseNotFoundException("roomId not found");
        Room room= roomRepository.findById(roomId).get();
        roomRepository.delete(roomRepository.findById(roomId).get());
        return room;
    }

    @Override
    public String getRoomUrl()  {
        // generate random string
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
        // create StringBuffer size of AlphaNumericString
        int n=15;
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
       // generate a random number between 0 to AlphaNumericString variable length
            int index = (int)(AlphaNumericString.length() * Math.random());
            // add Character one by one in end of sb
            sb.append(AlphaNumericString.charAt(index));
        }
        String hash=sb.toString();
        String url=IP+PORT+"#"+hash;
        return url;
    }
}