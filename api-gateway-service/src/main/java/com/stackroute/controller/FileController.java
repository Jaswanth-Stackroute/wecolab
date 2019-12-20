package com.stackroute.controller;

import com.stackroute.repository.S3Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;


@RestController
@RequestMapping("/api/v1")
public class FileController {

    @Autowired
    private S3Services s3Services;

    @PostMapping("/file/upload")
    public String uploadMultipartFile(@RequestParam("keyname") String keyName, @RequestParam("uploadfile") MultipartFile file) {
        System.out.println(file.getOriginalFilename());
        System.out.println("hiii");
        s3Services.uploadFile(keyName, file);
        return "Upload Successfully. -> KeyName = " + keyName;
    }

    @GetMapping("/file")
    public ResponseEntity<byte[]> downloadFile(@RequestParam("keyName") String keyname) {
        System.out.println(keyname);
        ByteArrayOutputStream downloadInputStream = s3Services.downloadFile(keyname);

        return ResponseEntity.ok()
                .contentType(contentType(keyname))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + keyname + "\"")
                .body(downloadInputStream.toByteArray());
    }

    private MediaType contentType(String keyname) {
        String[] arr = keyname.split("\\.");
        String type = arr[arr.length-1];
        switch(type) {
            case "txt": return MediaType.TEXT_PLAIN;
            case "png": return MediaType.IMAGE_PNG;
            case "jpg": return MediaType.IMAGE_JPEG;
            default: return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
}