package com.stackroute.multicasting.repository;

import com.stackroute.multicasting.domain.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface GroupRepository extends MongoRepository<Group, Integer> {

    List<Group> findByUserId(int userId);

    List<Group> findByGroupId(int groupId);

    void deleteGroupByUserIdAndGroupId(int userId,int groupId);
}
