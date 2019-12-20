package com.stackroute.multicasting.repository;

import com.stackroute.multicasting.domain.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message , Integer> {

    List<Message>  findByFromIdOrToId(int fromId,int toId);

    @Query(value = "{'toId': ?0,'fromId': { $ne: ?1}}")
    List<Message> findBytoId(int toId,int fromId);

    List<Message> findByToId(int toId);
}
