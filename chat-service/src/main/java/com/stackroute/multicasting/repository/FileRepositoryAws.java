package com.stackroute.multicasting.repository;


import com.stackroute.multicasting.domain.FileAttachmentAws;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FileRepositoryAws  extends MongoRepository<FileAttachmentAws, String> {

    @Query("{'fromid': ?0,'toid': ?1,'filename': ?2,'fileid':?3}")
    FileAttachmentAws findext(int fromid, int toid, String fileName, long fileid);

    @Query("{'fromid': ?0,'toid': ?1,'filename': ?2,'fileid':?3}")
    FileAttachmentAws findnewfilename(int fromid, int toid, String fileName, long fileid);
}
