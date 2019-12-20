package com.stackroute.multicasting.repository;


import com.stackroute.multicasting.domain.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification,Integer> {

    void deleteByConversationId(Long id);

    Notification findByConversationId(Long id);

    List<Notification> findByToId(int toId);
}
