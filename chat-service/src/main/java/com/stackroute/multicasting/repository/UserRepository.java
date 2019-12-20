package com.stackroute.multicasting.repository;

import com.stackroute.multicasting.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User,String> {}

