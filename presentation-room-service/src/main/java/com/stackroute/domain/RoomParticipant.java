package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Id;
import javax.persistence.*;
//   domain or  model

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="RoomParticipant")
public class RoomParticipant {
    @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;
    @Column
    private int userId;
    @Column
    private  int roomId;

}
