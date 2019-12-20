package com.stackroute.repository;

import com.stackroute.domain.CustomerDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<CustomerDetail,String> {

   // @Query("From CustomerDetail where cusEmail = ?0")
    List<CustomerDetail> findAll();

}
