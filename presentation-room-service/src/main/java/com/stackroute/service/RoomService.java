package com.stackroute.service;


import com.stackroute.domain.Room;
import com.stackroute.exception.DataBaseNotFoundException;

import java.util.List;

public interface RoomService {
    public Room saveRoom(Room room) throws DataBaseNotFoundException;

    public List<Room> getAllRoom() throws DataBaseNotFoundException;

    public  List<Room> getRoomByCompanyId(int companyId) throws DataBaseNotFoundException;

    public Room roomDetails(int id) throws DataBaseNotFoundException;

    public Room deleteById(int  id) throws DataBaseNotFoundException;

    // method to generate url
    public String getRoomUrl() ;

}
