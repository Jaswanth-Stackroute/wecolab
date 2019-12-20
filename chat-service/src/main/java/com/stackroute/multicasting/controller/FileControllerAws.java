package com.stackroute.multicasting.controller;


import com.stackroute.multicasting.domain.Notify;
import com.stackroute.multicasting.services.FileService;


import com.stackroute.multicasting.services.FileServiceAwsImpl;
import com.stackroute.multicasting.services.MessageServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;

import java.io.IOException;
import java.util.List;

@Controller
@CrossOrigin
public class FileControllerAws {



    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private FileService fileService;

    @Autowired
    private MessageServiceImplementation messageService;
    @Autowired
    private  FileServiceAwsImpl fileServiceAws;


    @Autowired
    public FileControllerAws(SimpMessagingTemplate template, FileService fileService,FileServiceAwsImpl fileServiceAws, MessageServiceImplementation messageService) {
        this.template = template;
        this.fileService = fileService;
        this.messageService = messageService;
        this.fileServiceAws = fileServiceAws;
    }


    @MessageMapping("/chat.sendFile/{fromId}/{toId}")
    public void sendMessage(@DestinationVariable int fromId, @DestinationVariable int toId, @Payload Notify notify) {
        this.fileServiceAws.saveNotify(notify);
        if (fromId != toId) {
            template.convertAndSend("/message/file/" + toId, notify);
        }
    }

    @MessageMapping("/chat.groupFile/{groupId}")
    public void groupMessage(@DestinationVariable int groupId, @Payload Notify notify) {
        this.fileServiceAws.saveNotify(notify);
        List<Integer> userIds = messageService.findMembersOfGroup(groupId);
        for (int userId : userIds) {
            if (userId != notify.getFromid())
                template.convertAndSend("/message/file" + userId, notify);
        }
    }



    @PostMapping("/api/files")
    public ResponseEntity<?> uploadMultipartFile( @RequestParam("file") MultipartFile file,@RequestParam String fromid, @RequestParam String toid, @RequestParam String filename, @RequestParam String ext,@RequestParam String fileid) throws IOException {
        //fileServiceAws.uploadFile(file,"1","1","application/pdf","3");
        fileServiceAws.uploadFile(file,fromid,toid,ext,fileid);
        return new ResponseEntity<String>("successfully saved",HttpStatus.OK) ;
    }


    @GetMapping(value = "/api/download/{filename}/{fromid}/{toid}/{fileid}")
    public ResponseEntity<byte[]> getFileFromFileSystem(@PathVariable String filename, @PathVariable int fromid, @PathVariable int toid, @PathVariable Long fileid, HttpServletResponse response) throws IOException {
        System.out.println(fromid + "hello" + toid);
        String fileext = this.fileServiceAws.getFileSystemExt(fromid, toid, filename, fileid);
        String keyname=this.fileServiceAws.getFileSystemKey(fromid, toid, filename, fileid);
        ByteArrayOutputStream downloadInputStream = fileServiceAws.downloadFile(keyname);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(fileext))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + keyname + "\"")
                .body(downloadInputStream.toByteArray());
    }

//    private MediaType contentType(String keyname) {
//        String[] arr = keyname.split("\\.");
//        String type = arr[arr.length-1];
//        switch(type) {
//            case "txt": return MediaType.TEXT_PLAIN;
//            case "png": return MediaType.IMAGE_PNG;
//            case "jpg": return MediaType.IMAGE_JPEG;
//            default: return MediaType.APPLICATION_OCTET_STREAM;
//        }
//    }

//    @GetMapping("/api/file/{keyname}")
//    public ResponseEntity<byte[]> downloadFile(@PathVariable String keyname) throws IOException {
//        ByteArrayOutputStream downloadInputStream = fileServiceAws.downloadFile(keyname);
//
//        return ResponseEntity.ok()
//                .contentType(contentType(keyname))
//                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + keyname + "\"")
//                .body(downloadInputStream.toByteArray());
//    }





//    @PostMapping(value = "/api/files")
//    public void handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam String fromid, @RequestParam String toid, @RequestParam String filename, @RequestParam String ext, @RequestParam String lastext,@RequestParam String fileid) throws Exception {
//        System.out.println("file name: "+filename);
//        this.fileService.storeFile(file,fromid,toid,filename,ext,lastext,fileid);
//
//    }

//    @GetMapping(value = "/api/download/{filename}/{fromid}/{toid}/{fileid}")
//    public ResponseEntity<InputStreamResource> getFileFromFileSystem(@PathVariable String filename, @PathVariable int fromid, @PathVariable int toid,@PathVariable Long fileid, HttpServletResponse response) throws FileNotFoundException {
//        System.out.println(fromid+"hello"+toid);
//        String filepath=this.fileService.getFileSystemPath(fromid,toid,filename,fileid);
//        String  fileext=this.fileService.getFileSystemExt(fromid,toid,filename,fileid);
//        System.out.println(filepath);
//        System.out.println(fileext);
//        File file = new File(filepath);
//        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
//        System.out.println(resource);
//        return ResponseEntity.ok()
//                // Content-Disposition
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
//                // Content-Type
//                .contentType(MediaType.valueOf(fileext))
//                // Contet-Length
//                .contentLength(file.length()) //
//                .body(resource);
//    }



//    @GetMapping("/api/file")
//    public ResponseEntity<byte[]> downloadFile(@RequestParam("keyName") String keyname) throws IOException {
//        ByteArrayOutputStream downloadInputStream = fileServiceAws.downloadFile(keyname);
//
//        return ResponseEntity.ok()
//                .contentType(contentType(keyname))
//                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + keyname + "\"")
//                .body(downloadInputStream.toByteArray());
//    }

//    private MediaType contentType(String keyname) {
//        String[] arr = keyname.split("\\.");
//        String type = arr[arr.length-1];
//        switch(type) {
//            case "txt": return MediaType.TEXT_PLAIN;
//            case "png": return MediaType.IMAGE_PNG;
//            case "jpg":
//            case "jpeg":
//                return MediaType.IMAGE_JPEG;
//            case "pdf": return MediaType.APPLICATION_PDF;
//            default: return MediaType.APPLICATION_OCTET_STREAM;
//        }
//    }

}
