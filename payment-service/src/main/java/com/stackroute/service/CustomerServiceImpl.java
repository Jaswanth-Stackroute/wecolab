package com.stackroute.service;

import com.stackroute.domain.CustomerDetail;
import com.stackroute.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Profile("customer")
public class CustomerServiceImpl implements CustomerService {

    private PaymentRepository paymentRepository;

    @Autowired
    public CustomerServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public CustomerDetail saveCustomer(CustomerDetail customer) {

        System.out.println(customer);
        customer.setTimeStamp(LocalDateTime.now());
        CustomerDetail savedCus = paymentRepository.save(customer);
        return savedCus;
    }

    @Override
    public CustomerDetail getCustomerByEmail(String email) {

        List<CustomerDetail> customerDetailList =paymentRepository.findAll().stream().filter( (data) -> data.getCusEmail().equals(email)).collect(Collectors.toList());
        if(customerDetailList.isEmpty()){
            return  null;
        }
        return customerDetailList.get(0);
    }
}
