package com.stackroute.multicasting.repository;

import com.stackroute.multicasting.domain.Notify;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface NotifyRepository  extends MongoRepository<Notify, String> {
    List<Notify> findByFromidOrToid(int fromId, int toId);

    @Query(value = "{'toid': ?0,'fromid': { $ne: ?1}}")
    List<Notify> findBytoId(int toId,int fromId);
}
