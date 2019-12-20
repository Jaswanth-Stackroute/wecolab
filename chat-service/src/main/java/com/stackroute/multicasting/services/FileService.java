package com.stackroute.multicasting.services;

import com.stackroute.multicasting.domain.FileAttachment;
import com.stackroute.multicasting.domain.Group;
import com.stackroute.multicasting.domain.Notify;
import com.stackroute.multicasting.repository.FileRepository;
import com.stackroute.multicasting.repository.GroupRepository;
import com.stackroute.multicasting.repository.NotifyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;


@Service
public class FileService {
    private static final String FILE_DIRECTORY = "/home/ubuntu/sharedFiles";
    private FileRepository fileRepository;
    private NotifyRepository notifyRepository;
    private GroupRepository groupRepository;

    @Autowired
    public FileService(FileRepository fileRepository,NotifyRepository notifyRepository,GroupRepository groupRepository) {
        this.fileRepository=fileRepository;
        this.notifyRepository=notifyRepository;
        this.groupRepository =  groupRepository;
    }

    public Notify saveNotify(Notify notify) {
        return this.notifyRepository.save(notify);
    }

    public void storeFile(MultipartFile file, String  fromid, String toid, String filename, String ext, String lastext, String fileid) throws Exception {
        try {
            String pa=FILE_DIRECTORY+"/"+file.getOriginalFilename();
           // String pa=FILE_DIRECTORY+"/"+fileid+"_"+file.getOriginalFilename();
            System.out.println(pa);
            Path filePath = Paths.get(FILE_DIRECTORY + "/" +fileid+"_"+file.getOriginalFilename());
            System.out.println(fromid);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            String path = filePath.toString();
            FileAttachment files = new FileAttachment();
            files.setFilePath(path);
            files.setFromid(Integer.parseInt(fromid));
            files.setToid(Integer.parseInt(toid));
            files.setFilename(file.getOriginalFilename());
            files.setExt(ext);
            files.setLastext(lastext);
            files.setFileid(Long.parseLong(fileid));
            this.fileRepository.save(files);
        }catch(Exception e){
            System.out.println(e);
        }
    }

    public List<Notify> findAllFiles(int fromId) {
        List<Notify> notifyList=this.notifyRepository.findByFromidOrToid(fromId, fromId);
        for(Group group:this.groupRepository.findByUserId(fromId)){
            notifyList.addAll(this.notifyRepository.findBytoId(group.getGroupId(),fromId));
        }
        return notifyList;
    }

    public String getFileSystemPath(int fromid,int toid,String filename,long fileid) {
        String filepathfromMongo=this.fileRepository.findpath(fromid,toid,filename,fileid).getFilePath();
        return filepathfromMongo;
    }
    public String getFileSystemExt(int fromid,int toid,String filename,long fileid) {
        String fileextfromMongo=this.fileRepository.findext(fromid,toid,filename,fileid).getExt();
        return fileextfromMongo;
    }


}
