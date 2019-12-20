package com.stackroute.controller;

import com.stackroute.model.*;
import com.stackroute.repository.CompanyRepository;
import com.stackroute.repository.ConfirmationTokenRepository;
import com.stackroute.repository.S3Services;
import com.stackroute.repository.UserRepository;
import com.stackroute.services.EmailSenderService;
import com.stackroute.services.UserService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.servlet.ServletContext;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/user")
public class UserAccountController {
    private EmailSenderService emailSenderService;
    private UserRepository userRepository;
    private ConfirmationTokenRepository confirmationTokenRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserService userService;
    private CompanyRepository companyRepository;
    private ServletContext context;
    private S3Services s3Services;

    @Autowired
    public UserAccountController(EmailSenderService emailSenderService, UserRepository userRepository, ConfirmationTokenRepository confirmationTokenRepository, BCryptPasswordEncoder bCryptPasswordEncoder, UserService userService, CompanyRepository companyRepository, ServletContext context, S3Services s3Services) {
        this.emailSenderService = emailSenderService;
        this.userRepository = userRepository;
        this.confirmationTokenRepository = confirmationTokenRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userService = userService;
        this.companyRepository = companyRepository;
        this.context = context;
        this.s3Services = s3Services;
    }


    @PostMapping("/addMember")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> register(@RequestBody AddMemberReq req) throws IOException, MessagingException {
        DAOUser existingDAOUser = userRepository.findByEmailId(req.getEmailId());
        if (existingDAOUser != null) {
            return new ResponseEntity<String>("member already exist with this emailId", HttpStatus.OK);
        } else {
            DAOUser user = new DAOUser();
            String password = userService.generateRandomPassword(10);
            user.setEmailId(req.getEmailId());
            user.setRole("USER");
            user.setPassword(bCryptPasswordEncoder.encode(password));
            Company company = companyRepository.findById(req.getCompanyId()).get();
            user.setCompany(company);
            userRepository.save(user);
            ConfirmationToken confirmationToken = new ConfirmationToken(user);

            confirmationTokenRepository.save(confirmationToken);

            Mail mail = new Mail();
            mail.setFrom("no-reply@domain.com");
            mail.setTo(req.getEmailId());
            mail.setSubject("Activate account");
            mail.setTemplate("confirm_user_account");


            Map<String, Object> model = new HashMap<String, Object>();
            model.put("emailId", req.getEmailId());
            model.put("companyName", company.getCompanyName());
            model.put("password", password);
            model.put("token", "http://13.126.147.254:8081/api/v1/user/confirm-account?token=" + confirmationToken.getConfirmationToken());
            mail.setModel(model);

            emailSenderService.sendSimpleMessage(mail);
        }

        return new ResponseEntity<String>(req.getEmailId() + " is added successfully", HttpStatus.CREATED);
    }

    @RequestMapping(value = "/confirm-account", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmAcc(@RequestParam("token") String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token != null) {
            DAOUser DAOUser = userRepository.findByEmailIdIgnoreCase(token.getDAOUser().getEmailId());
            DAOUser.setEnabled(true);
            userRepository.save(DAOUser);
            return new ResponseEntity<String>("account verified", HttpStatus.OK);
        }

        return new ResponseEntity<String>("account not verified", HttpStatus.CONFLICT);

    }

    @RequestMapping(value = "/getMemberByEmailId", method = RequestMethod.GET)
    @PreAuthorize("hasAnyRole('USER', 'OWNER')")
    public ResponseEntity<?> allUsers(@RequestParam("emailId") String emailId) {
        DAOUser user = userRepository.findByEmailId(emailId);


        return new ResponseEntity<DAOUser>(user, HttpStatus.OK);
    }

    @GetMapping("/getUserByEmailId")
    @PreAuthorize("hasAnyRole('USER', 'OWNER')")
    public ResponseEntity<?> getMember(@RequestParam("emailId") String emailId) throws IOException {
        DAOUser user = userRepository.findByEmailId(emailId);
        if (user != null)
        {
            return new ResponseEntity<DAOUser>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/getMemberByRole")
    @PreAuthorize("hasAnyRole('WECOLAB')")
    public ResponseEntity<?> getCompanyOwners(@RequestParam("role") String role) {
        return new ResponseEntity<List<DAOUser>>(userRepository.findByRole(role), HttpStatus.OK);
    }

    @PutMapping("/changePassword")
    @PreAuthorize("hasAnyRole('USER', 'OWNER','WECOLAB')")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassReq req) {
        DAOUser existingUser = userRepository.findByEmailId(req.getEmailId());
        if (!bCryptPasswordEncoder.matches(req.getCurrentPassword(), existingUser.getPassword())) {
            return new ResponseEntity<String>("invalid_current_password", HttpStatus.OK);
        }
        existingUser.setPassword(bCryptPasswordEncoder.encode(req.getNewPassword()));
        userRepository.save(existingUser);
        return new ResponseEntity<String>("password_changed", HttpStatus.CREATED);
    }

    @PutMapping("/updateProfile")
    @PreAuthorize("hasAnyRole('USER', 'OWNER')")
    public ResponseEntity<?> updateProfile(@RequestBody DAOUser user) {
        DAOUser existingUser = userRepository.findByEmailId(user.getEmailId());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setPhone(user.getPhone());
        userRepository.save(existingUser);
        return new ResponseEntity<String>("profile updated successfully", HttpStatus.OK);
    }

    @PostMapping("/employeeRegister")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> employeeRegister(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("emailId") String emailId, @RequestParam("phone") String phone, @RequestParam("profilePic") MultipartFile profilePic, @RequestParam("password") String password) {
        System.out.println("profile" + profilePic);
        DAOUser existingUser = userRepository.findByEmailId(emailId);
        existingUser.setFirstName(firstName);
        existingUser.setLastName(lastName);
        existingUser.setPhone(phone);
        existingUser.setProfilePic(saveFile(profilePic, emailId));
        existingUser.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(existingUser);
        return ResponseEntity.ok("you have set profile successfully");
    }

    @PutMapping("/forgetPassword")
    public ResponseEntity<?> forgetPassword(@RequestBody String emailId) throws IOException, MessagingException {
        System.out.println(emailId);
        DAOUser existingUser = userRepository.findByEmailId(emailId);
        if (existingUser == null) {
            return new ResponseEntity<String>("invalid", HttpStatus.OK);
        } else if (!existingUser.isEnabled()) {
            return new ResponseEntity<String>("notEnabled", HttpStatus.OK);
        }
        String newPassword = userService.generateRandomPassword(10);
        existingUser.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(existingUser);

        Mail mail = new Mail();
        mail.setFrom("no-reply@domain.com");
        mail.setTo(emailId);
        mail.setSubject("Account Recovery");
        mail.setTemplate("forget_password");


        Map<String, Object> model = new HashMap<String, Object>();
        model.put("emailId", emailId);
        //model.put("companyId", companyId);
        model.put("password", newPassword);
        //model.put("token","http://localhost:8081/api/v1/user/confirm-account?token="+confirmationToken.getConfirmationToken());
        mail.setModel(model);

        emailSenderService.sendSimpleMessage(mail);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }


    // get user by companyId
    @GetMapping("/getUserByCompanyId")
    public ResponseEntity<?> getUserByCompanyId(@RequestParam("id") int id) throws Exception {
        List<DAOUser> DAOUserList = userRepository.findAllUserById(id);
        List<UserBasicInfo> list1 = new ArrayList<>();
        for (int i = 0; i < DAOUserList.size(); i++) {
            if (DAOUserList.get(i).isEnabled()) {
                UserBasicInfo userBasicInfo = new UserBasicInfo();
                userBasicInfo.setId(DAOUserList.get(i).getUserId());
                userBasicInfo.setEmail(DAOUserList.get(i).getEmailId());
                userBasicInfo.setName(DAOUserList.get(i).getFirstName() + " " + DAOUserList.get(i).getLastName());
                userBasicInfo.setCompanyId(DAOUserList.get(i).getCompany().getId());
                userBasicInfo.setPhone(DAOUserList.get(i).getPhone());
                userBasicInfo.setRole(DAOUserList.get(i).getRole());
                userBasicInfo.setProfilePic(DAOUserList.get(i).getProfilePic());
                userBasicInfo.setEnabled(DAOUserList.get(i).isEnabled());
                list1.add(userBasicInfo);
            }
        }
        return new ResponseEntity<List<UserBasicInfo>>(list1, HttpStatus.OK);
    }


    @GetMapping("/getAllUserByCompanyId")
    public ResponseEntity<?> getAllUserByCompanyId(@RequestParam("id") int id) throws Exception {
        List<DAOUser> DAOUserList = userRepository.findAllUserById(id);
        List<UserBasicInfo> list1 = new ArrayList<>();
        for (int i = 0; i < DAOUserList.size(); i++) {
                UserBasicInfo userBasicInfo = new UserBasicInfo();
                userBasicInfo.setId(DAOUserList.get(i).getUserId());
                userBasicInfo.setEmail(DAOUserList.get(i).getEmailId());
                userBasicInfo.setName(DAOUserList.get(i).getFirstName() + " " + DAOUserList.get(i).getLastName());
                userBasicInfo.setCompanyId(DAOUserList.get(i).getCompany().getId());
                userBasicInfo.setPhone(DAOUserList.get(i).getPhone());
                userBasicInfo.setRole(DAOUserList.get(i).getRole());
                userBasicInfo.setProfilePic(DAOUserList.get(i).getProfilePic());
                userBasicInfo.setEnabled(DAOUserList.get(i).isEnabled());
                list1.add(userBasicInfo);

        }
        return new ResponseEntity<List<UserBasicInfo>>(list1, HttpStatus.OK);
    }


    @DeleteMapping("/removeMember")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> removeMember(@RequestParam("memberId") long userId) {
        userRepository.deleteConfirmationTokenByUserId(userId);
        userRepository.deleteUserById(userId);
        return new ResponseEntity<>("member removed successfully", HttpStatus.OK);
    }


    @PostMapping("/updateProfilePic")
    @PreAuthorize("hasAnyRole('USER', 'OWNER')")
    public ResponseEntity<?> update(@RequestParam("profilePic") MultipartFile profilePic, @RequestParam("emailId") String emailId) {
        DAOUser user=userRepository.findByEmailId(emailId);
        user.setProfilePic(saveFile(profilePic,emailId));
        userRepository.save(user);

        return new ResponseEntity<String>("profile updated successfully", HttpStatus.OK);
    }

    @GetMapping("/getProfilePic")
    @PreAuthorize("hasAnyRole('USER', 'OWNER')")
    public ResponseEntity<?> getProfilePic(@RequestParam("emailId") String emailId) throws IOException {
        DAOUser user = userRepository.findByEmailId(emailId);
        String imgSrc = null;
        if (user != null) {
//            File fileName = new File(user.getProfilePic());
//            String extension = FilenameUtils.getExtension(String.valueOf(fileName));
//            FileInputStream fileInputStream = new FileInputStream(fileName);
//            byte[] bytes = new byte[(int) fileName.length()];
//            System.out.println("length:" + fileName.length());
//            fileInputStream.read(bytes);
//            String encodeBase64 = Base64.getEncoder().encodeToString(bytes);
//            imgSrc = "data:image/" + extension + ";base64," + encodeBase64;

            imgSrc=user.getProfilePic();

        }
        return new ResponseEntity<String>(imgSrc, HttpStatus.OK);
    }

    @GetMapping("/getProfilePicture")
    public ResponseEntity<byte[]> downloadFile(@RequestParam("keyName") String keyname) {
        System.out.println(keyname);
        ByteArrayOutputStream downloadInputStream = s3Services.downloadFile(keyname);

        return ResponseEntity.ok()
                .contentType(contentType(keyname))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + keyname + "\"")
                .body(downloadInputStream.toByteArray());
    }

    @DeleteMapping("/deleteCompany")
    public ResponseEntity<?> deleteteCompany(@RequestParam("emailId") String emailId)
    {
        DAOUser owner=userRepository.findByEmailId(emailId);
        if(owner==null)
        {
            return new ResponseEntity<String>("company doesn't exist",HttpStatus.BAD_REQUEST);
        }
        if(owner.isEnabled())
        {
            return new ResponseEntity<String>("company is verified",HttpStatus.OK);
        }
        userRepository.deleteConfirmationTokenByUserId(owner.getUserId());
        int companyId=owner.getCompany().getId();
        userRepository.deleteUserById(owner.getUserId());
        companyRepository.deleteById(companyId);
        return new ResponseEntity<String>("company successfully removed",HttpStatus.OK);
    }
    private MediaType contentType(String keyname) {
        String[] arr = keyname.split("\\.");
        String type = arr[arr.length - 1];
        switch (type) {
            case "txt":
                return MediaType.TEXT_PLAIN;
            case "png":
                return MediaType.IMAGE_PNG;
            case "jpg":
                return MediaType.IMAGE_JPEG;
            default:
                return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
    public String saveFile(MultipartFile profilePic, String emailId) {

        String fileName = profilePic.getOriginalFilename();
        String modifiedFileName = emailId.substring(0, emailId.indexOf('@'));
        String keyName=modifiedFileName+".jpg";
        System.out.println(keyName);
        s3Services.uploadFile(keyName,profilePic);
        //System.out.println("https://s3.ap-south-1.amazonaws.com/wecolab.immersive/"+keyName+"%2C");

        return "http://13.126.147.254:8081/api/v1/user/getProfilePicture?keyName="+keyName;
    }

    public String getProfilePicture(String filePath) throws IOException {
        if (filePath == null) {
            return null;
        }
        String imgSrc = null;
        File fileName = new File(filePath);
        String extension = FilenameUtils.getExtension(String.valueOf(fileName));
        FileInputStream fileInputStream = new FileInputStream(fileName);
        byte[] bytes = new byte[(int) fileName.length()];
        fileInputStream.read(bytes);
        String encodeBase64 = Base64.getEncoder().encodeToString(bytes);
        imgSrc = "data:image/" + extension + ";base64," + encodeBase64;
        return imgSrc;
    }

}
