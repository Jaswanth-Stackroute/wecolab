package com.stackroute.controller;

import com.stackroute.model.*;
import com.stackroute.repository.CompanyRepository;
import com.stackroute.repository.ConfirmationTokenRepository;
import com.stackroute.repository.UserRepository;
import com.stackroute.services.CompanyRegistrationService;
import com.stackroute.services.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RequestMapping("/api/v1/company/")
public class CompanyController {
    @Autowired
    CompanyRegistrationService companyRegistrationService;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    EmailSenderService emailSenderService;
    @Autowired
    BCryptPasswordEncoder cryptPasswordEncoder;
    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    UserRepository userRepository;
    @PostMapping("registerCompany")
    public ResponseEntity<?> registerCompany(@RequestBody CompanyDetails companyDetails) throws IOException, MessagingException {
        Company existCompany=companyRepository.findByCompanyIdIgnoreCase(companyDetails.getCompanyId());
        DAOUser existDAOUser =userRepository.findByEmailId(companyDetails.getEmailId());
        if(existCompany!=null)
        {
            return new ResponseEntity<String>("company already exist with given Id",HttpStatus.CONFLICT);
        }
        else if(existDAOUser !=null)
        {
            return new ResponseEntity<String>("user already exist with given emailId",HttpStatus.CONFLICT);
        }
        else
        {
            String encodedPass=cryptPasswordEncoder.encode(companyDetails.getPassword());
            companyDetails.setPassword(encodedPass);
            DAOUser daoUser =new DAOUser();
            daoUser.setEmailId(companyDetails.getEmailId());
            daoUser.setFirstName(companyDetails.getFirstName());
            daoUser.setLastName(companyDetails.getLastName());
            daoUser.setPassword(companyDetails.getPassword());
            daoUser.setRole("OWNER");
            daoUser.setPhone(companyDetails.getPhone());
            Company company=new Company(companyDetails.getCompanyId(),companyDetails.getCompanyName());
            companyRegistrationService.saveCompany(company);
            daoUser.setCompany(company);
            userRepository.save(daoUser);

            ConfirmationToken confirmationToken=new ConfirmationToken(daoUser);
            confirmationTokenRepository.save(confirmationToken);
            try
            {
                Mail mail = new Mail();
                mail.setFrom("no-reply@domain.com");
                mail.setTo(daoUser.getEmailId());
                mail.setSubject("Registration Confirmation");
                mail.setTemplate("registration_conformation");

                Map<String, Object> model = new HashMap<String, Object>();
                model.put("firstName", daoUser.getFirstName());
                model.put("companyName", company.getCompanyName());
                model.put("token","http://13.126.147.254:8081/api/v1/company/confirm-account?token="+confirmationToken.getConfirmationToken());
                mail.setModel(model);
                emailSenderService.sendSimpleMessage(mail);
            }
            catch (Exception e)
            {
                e.printStackTrace();
                return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
            }


        }
        return new ResponseEntity<String>("Registration Success!",HttpStatus.OK);
    }

    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmAcc(@RequestParam("token") String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
            DAOUser DAOUser = userRepository.findByEmailIdIgnoreCase(token.getDAOUser().getEmailId());
            DAOUser.setEnabled(true);
            userRepository.save(DAOUser);
            return new ResponseEntity<String>("account verified",HttpStatus.OK);
        }

        return new ResponseEntity<String>("account not verified",HttpStatus.CONFLICT);

    }
    @GetMapping("getAllCompany")
    public ResponseEntity<?> getAllCompany()
    {
        return new ResponseEntity<List<Company>>(companyRepository.findAll(),HttpStatus.OK);
    }

}
