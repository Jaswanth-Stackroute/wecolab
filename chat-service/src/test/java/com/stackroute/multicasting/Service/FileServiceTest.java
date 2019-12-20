package com.stackroute.multicasting.Service;

import com.stackroute.multicasting.domain.FileAttachment;
import com.stackroute.multicasting.domain.Notify;
import com.stackroute.multicasting.repository.FileRepository;
import com.stackroute.multicasting.repository.NotifyRepository;
import com.stackroute.multicasting.services.FileService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class FileServiceTest {
    private Notify notify;
    private FileAttachment fileAttachment;

    @Mock
    private NotifyRepository notifyRepository;
    @Mock
    private FileRepository fileRepository;


    @InjectMocks
    private FileService fileService;

    List<Notify> notifyList= null;
    List<FileAttachment> fileList= null;

    @Before
    public void setUp(){
        //Initialising the mock object
        MockitoAnnotations.initMocks(this);
        notify = new Notify();
        notify.setFromid(27017);
        notify.setToid(27027);
        notify.setFileid((long)123533456);
        notify.setFilename("3ac.pdf");
        notify.setExt("application/pdf");
        notify.setLastext(".pdf");
        notifyList = new ArrayList<>();
        notifyList.add(notify);
        fileAttachment=new FileAttachment("/home/cgi/trial/123533456_3ac.pdf",27017,27027,"3ac.pdf","application/pdf",".pdf",(long)123533456);

    }

    @Test
    public void saveNotify() throws Exception {
        when(notifyRepository.save((Notify) any())).thenReturn(notify);
        Notify savedNotify = fileService.saveNotify(notify);
        Assert.assertEquals(notify,savedNotify);

    }

    @Test
    public void getFileSystemPath() throws Exception{
        when(fileRepository.findpath(27017,27027,"3ac.pdf",(long)123533456)).thenReturn(fileAttachment);
//       String filePathString=fileAttachment.getFilePath();
        String filePathString1=fileService.getFileSystemPath(27017,27027,"3ac.pdf",(long)123533456);
        Assert.assertEquals(fileAttachment.getFilePath(),filePathString1);
    }

    @Test
    public void getFileSystemExt() throws Exception{
        when(fileRepository.findext(27017,27027,"3ac.pdf",(long)123533456)).thenReturn(fileAttachment);
        String filePathString=fileAttachment.getExt();
        String filePathString1=fileService.getFileSystemExt(27017,27027,"3ac.pdf",(long)123533456);
        Assert.assertEquals(filePathString1,filePathString);
    }


}
