package com.stackroute.repository;


import com.stackroute.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    /* the implementation will be provided to us in run time*/
    @Query("from Room where companyId=?1 order by sql_date ,sql_time")
    public List<Room> findBycompanyId(int companyId);

    @Query("from Room where id=?1")
    public Room findByRoomId(int companyId);

    @Query("from Room order by sql_date ,sql_time ")
    public List<Room> findAllRoom ();

}