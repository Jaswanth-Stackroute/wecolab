package com.stackroute.multicasting.repository;

import com.stackroute.multicasting.domain.FileAttachment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FileRepository extends MongoRepository<FileAttachment, String> {

    @Query("{'fromid': ?0,'toid': ?1,'filename': ?2,'fileid':?3}")
    FileAttachment findpath(int fromid,int toid,String fileName,long fileid);


    @Query("{'fromid': ?0,'toid': ?1,'filename': ?2,'fileid':?3}")
    FileAttachment findext(int fromid,int toid,String fileName,long fileid);
}
