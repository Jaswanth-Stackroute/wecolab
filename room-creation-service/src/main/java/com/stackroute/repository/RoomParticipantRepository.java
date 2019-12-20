package com.stackroute.repository;


import com.stackroute.domain.RoomParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

@Repository
public interface RoomParticipantRepository extends JpaRepository<RoomParticipant, Integer> {
    /* the implementation will be provided to us in run time*/
    @Query("from RoomParticipant where userId=?1")
    public List<RoomParticipant> findRoomParticipationByUserId(int userId);

    @Query("from RoomParticipant where roomId=?1")
    public List<RoomParticipant> findRoomParticipationByRoomId(int roomId);

    // add  so that we can update/delete from database
    @Modifying
    @Transactional
    @Query("delete from RoomParticipant where roomId=?1")
    public void deleteRoomParticipationByRoomId(int roomId);

    @Modifying
    @Transactional
    @Query("delete from RoomParticipant where userId=?1")
    public void deleteRoomParticipationByUserId(int userId);

}