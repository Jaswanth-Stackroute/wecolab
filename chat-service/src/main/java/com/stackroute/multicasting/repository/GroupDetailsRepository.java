package com.stackroute.multicasting.repository;

import com.stackroute.multicasting.domain.GroupDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GroupDetailsRepository extends MongoRepository<GroupDetails,Integer> {

    GroupDetails findByTeamIdAndId(int teamId,int id);

    List<GroupDetails> findByTeamId(int teamId);
}
