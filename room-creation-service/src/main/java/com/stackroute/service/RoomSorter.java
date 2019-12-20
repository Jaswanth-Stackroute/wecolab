package com.stackroute.service;

import com.stackroute.domain.RoomLink;

import java.util.Comparator;

public class  RoomSorter implements Comparator<RoomLink> {


    @Override
    public int compare(RoomLink roomLink1, RoomLink roomLink2)
    {
        int  dateCompare= roomLink1.getSqlDate().compareTo(roomLink2.getSqlDate());
        int timeCompare= roomLink1.getSqlTime().compareTo(roomLink2.getSqlTime());

        if(dateCompare==0)
        {
           return timeCompare;
        }
        else {
            return dateCompare;
        }
    }
}