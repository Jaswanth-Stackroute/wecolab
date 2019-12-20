package com.stackroute.services;

import com.stackroute.model.Company;
import com.stackroute.repository.CompanyRepository;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyRegistrationService
{
    @Autowired
    CompanyRepository companyRepository;
    public Company saveCompany(Company company)
    {
        companyRepository.save(company);
        return company;
    }
}
