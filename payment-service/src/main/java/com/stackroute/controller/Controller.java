package com.stackroute.controller;

import com.stackroute.domain.CustomerDetail;
import com.stackroute.service.CustomerService;
import com.stackroute.service.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.Card;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin(value = "*",allowedHeaders = "*")
public class Controller {

    private StripeClient stripeClient;
    private CustomerService customerService;

    private static ResponseEntity<?> responseEntity;

    @Autowired
    public Controller(StripeClient stripeClient, CustomerService customerService) {
        this.stripeClient = stripeClient;
        this.customerService = customerService;
    }

    @PostMapping("/charge")
    public Charge chargeCard(HttpServletRequest request) throws StripeException {
        Double amount = Double.parseDouble(request.getHeader("amount"));
        String customer = request.getHeader("customer");
        return this.stripeClient.chargeCreditCard(customer,amount);
    }

    @PostMapping("/customer")
    public ResponseEntity<Customer> addCustomer(@RequestBody CustomerDetail customer) throws StripeException, Exception {
        System.out.printf("Saving user to stripe");
        String name = customer.getCusName();
        String email = customer.getCusEmail();
//        customerService.saveCustomer(customer);
        return new ResponseEntity<>(this.stripeClient.addCustomer(name,email),HttpStatus.OK);
    }

    @PostMapping("/card")
    public ResponseEntity<Customer> addCard(HttpServletRequest request) throws StripeException {
        System.out.printf("Hey bro");

        String customerId = request.getHeader("customerId");
        String number=request.getHeader("number");
        int exp_month=Integer.parseInt(request.getHeader("exp_month"));
        int exp_year=Integer.parseInt(request.getHeader("exp_year"));

        return new ResponseEntity<>(this.stripeClient.addCard(customerId,number,exp_month,exp_year),HttpStatus.OK);
    }

    @DeleteMapping("/card")
    public Card deleteCard(HttpServletRequest request) throws StripeException {
        String custId = request.getHeader("customerId");
        String cardId = request.getHeader("cardId");
        return this.stripeClient.deleteCard(custId,cardId);
    }

    @PostMapping("/addCustomer")
    public ResponseEntity<?> addCustomers(@RequestBody CustomerDetail customer){
        CustomerDetail savedCustomer = customerService.saveCustomer(customer);
        responseEntity = new ResponseEntity<CustomerDetail>(savedCustomer, HttpStatus.CREATED);

        return responseEntity;
    }

    @GetMapping("/getcus/{cusEmail}")
    public ResponseEntity<?> getCustomerByEmail(@PathVariable String cusEmail){
        System.out.printf(cusEmail);

        CustomerDetail getCustomer = customerService.getCustomerByEmail(cusEmail);
        System.out.println(getCustomer);
        if(getCustomer == null){
            return responseEntity = new ResponseEntity<CustomerDetail>(new CustomerDetail("","","", LocalDateTime.now().minusYears(10),0),HttpStatus.OK);
        }
        responseEntity = new ResponseEntity<CustomerDetail>(getCustomer,HttpStatus.OK);
        return responseEntity;
    }

}
