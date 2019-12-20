package com.stackroute.repository;

import com.stackroute.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Integer> {
    Company findByCompanyIdIgnoreCase(String companyId);
}
