package com.stackroute.multicasting.services;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.stackroute.multicasting.domain.FileAttachment;
import com.stackroute.multicasting.domain.FileAttachmentAws;
import com.stackroute.multicasting.domain.Group;
import com.stackroute.multicasting.domain.Notify;
import com.stackroute.multicasting.repository.FileRepository;
import com.stackroute.multicasting.repository.FileRepositoryAws;
import com.stackroute.multicasting.repository.GroupRepository;
import com.stackroute.multicasting.repository.NotifyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
@Service
public class FileServiceAwsImpl{
    private static final String FILE_DIRECTORY = "/home/ubuntu/sharedFiles";

    private FileRepository fileRepository;

    private NotifyRepository notifyRepository;

    private GroupRepository groupRepository;
    private FileRepositoryAws fileRepositoryAws;


    private AmazonS3 s3client;

    @Value("${gkz.s3.bucket}")
    private String bucketName;


    @Autowired
    public FileServiceAwsImpl(FileRepository fileRepository,NotifyRepository notifyRepository,GroupRepository groupRepository,FileRepositoryAws fileRepositoryAws,AmazonS3 s3client) {
        this.fileRepository=fileRepository;
        this.notifyRepository=notifyRepository;
        this.groupRepository =  groupRepository;
        this.fileRepositoryAws=fileRepositoryAws;
        this.s3client = s3client;

    }

    private Logger logger = LoggerFactory.getLogger(FileServiceAwsImpl.class);

    public ByteArrayOutputStream downloadFile(String keyName) throws IOException {
        try {
            S3Object s3object = s3client.getObject(new GetObjectRequest(bucketName, "/files/"+keyName));

            InputStream is = s3object.getObjectContent();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int len;
            byte[] buffer = new byte[4096];
            while ((len = is.read(buffer, 0, buffer.length)) != -1) {
                baos.write(buffer, 0, len);
            }

            return baos;
        } catch (IOException ioe) {
            logger.error("IOException: " + ioe.getMessage());
        } catch (AmazonServiceException ase) {
            logger.info("sCaught an AmazonServiceException from GET requests, rejected reasons:");
            logger.info("Error Message:    " + ase.getMessage());
            logger.info("HTTP Status Code: " + ase.getStatusCode());
            logger.info("AWS Error Code:   " + ase.getErrorCode());
            logger.info("Error Type:       " + ase.getErrorType());
            logger.info("Request ID:       " + ase.getRequestId());
            throw ase;
        } catch (AmazonClientException ace) {
            logger.info("Caught an AmazonClientException: ");
            logger.info("Error Message: " + ace.getMessage());
            throw ace;
        }

        return null;

    }

    public void uploadFile(MultipartFile file,String  fromid, String toid, String ext,String fileid) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        String keyName=fileid+"_"+file.getOriginalFilename();
        s3client.putObject(bucketName, "/files/"+keyName, file.getInputStream(), metadata);
        FileAttachmentAws fileAttachmentAws=new FileAttachmentAws();
        fileAttachmentAws.setFromid(Integer.parseInt(fromid));
        fileAttachmentAws.setToid(Integer.parseInt(toid));
        fileAttachmentAws.setExt(ext);
        fileAttachmentAws.setFilename(file.getOriginalFilename());
        fileAttachmentAws.setFileid(Long.parseLong(fileid));
        fileAttachmentAws.setNewfilename(keyName);
	this.fileRepositoryAws.save(fileAttachmentAws);

    }

    public Notify saveNotify(Notify notify) {
        return this.notifyRepository.save(notify);
    }



    public List<Notify> findAllFiles(int fromId) {
        List<Notify> notifyList=this.notifyRepository.findByFromidOrToid(fromId, fromId);
        for(Group group:this.groupRepository.findByUserId(fromId)){
            notifyList.addAll(this.notifyRepository.findBytoId(group.getGroupId(),fromId));
        }
        return notifyList;
    }


    public String getFileSystemExt(int fromid,int toid,String filename,long fileid) {
        String fileextfromMongo=this.fileRepositoryAws.findext(fromid,toid,filename,fileid).getExt();
        return fileextfromMongo;
    }
    public String getFileSystemKey(int fromid,int toid,String filename,long fileid) {
        String fileextfromMongo=this.fileRepositoryAws.findext(fromid,toid,filename,fileid).getNewfilename();
        return fileextfromMongo;
    }

}
