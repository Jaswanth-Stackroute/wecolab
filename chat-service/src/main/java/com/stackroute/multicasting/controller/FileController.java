//package com.stackroute.multicasting.controller;
//
//
//import com.stackroute.multicasting.domain.Notify;
//import com.stackroute.multicasting.domain.User;
//import com.stackroute.multicasting.services.FileService;
//import com.stackroute.multicasting.services.MessageServiceImplementation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.InputStreamResource;
//import org.springframework.core.io.Resource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.DestinationVariable;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.servlet.http.HttpServletResponse;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileNotFoundException;
//import java.util.List;
//
//@Controller
//@CrossOrigin
//public class FileController {
//
//    @Autowired
//    private SimpMessagingTemplate template;
//
//    @Autowired
//    private FileService fileService;
//
//    @Autowired
//    private MessageServiceImplementation messageService;
//
//
//    @MessageMapping("/chat.sendFile/{fromId}/{toId}")
//    public void sendMessage(@DestinationVariable int fromId, @DestinationVariable int toId, @Payload Notify notify) {
//        this.fileService.saveNotify(notify);
//        if (fromId != toId) {
//            template.convertAndSend("/message/file/" + toId, notify);
//        }
//    }
//
//    @MessageMapping("/chat.groupFile/{groupId}")
//    public void groupMessage(@DestinationVariable int groupId, @Payload Notify notify) {
//        this.fileService.saveNotify(notify);
//        List<Integer> userIds = messageService.findMembersOfGroup(groupId);
//        for (int userId : userIds) {
//            if (userId != notify.getFromid())
//                template.convertAndSend("/message/file" + userId, notify);
//        }
//    }
//
//    @PostMapping(value = "/api/files")
//    public void handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam String fromid, @RequestParam String toid, @RequestParam String filename, @RequestParam String ext, @RequestParam String lastext,@RequestParam String fileid) throws Exception {
//        System.out.println("file name: "+filename);
//        this.fileService.storeFile(file,fromid,toid,filename,ext,lastext,fileid);
//
//    }
//
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
//
//
//
//}
