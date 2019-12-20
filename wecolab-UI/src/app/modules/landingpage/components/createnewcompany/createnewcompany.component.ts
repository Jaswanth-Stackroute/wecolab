import { Component, OnInit } from '@angular/core';
import { CompanyregisterationService } from '../../services/companyregisteration.service';
import { Company } from './company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr'



@Component({
  selector: 'app-createnewcompany',
  templateUrl: './createnewcompany.component.html',
  styleUrls: ['./createnewcompany.component.css']
})
export class CreatenewcompanyComponent implements OnInit {

  constructor(private register: CompanyregisterationService, private fb: FormBuilder, private modalService: NgbModal, private toastr: ToastrService) { }
  dropDownOpen = false;
  companyForm: FormGroup;
  successMsg = false;
  errorMsg = false;
  message: string;
  company: Company;

  //company;
  ngOnInit() {
    this.companyForm = this.fb.group({
      companyId: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern("^[a-zA-Z_]+[0-9._\\.a-zA-Z]+@[a-z0-9.-]+[\\.]+([a-z]{2,4})$")]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      termAndCondition: [false, Validators.requiredTrue]
    })

    this.successMsg = false;
    this.errorMsg = false;

  }
  get companyId() { return this.companyForm.get('companyId'); }
  get companyName() { return this.companyForm.get('companyName'); }
  get emailId() { return this.companyForm.get('emailId'); }
  get firstName() { return this.companyForm.get('firstName'); }
  get lastName() { return this.companyForm.get('lastName'); }
  get phone() { return this.companyForm.get('phone'); }
  get password() { return this.companyForm.get('password'); }
  get confirmPassword() { return this.companyForm.get('confirmPassword'); }
  get termAndCondition() { return this.companyForm.get('termAndCondition'); }
  //company=new Company("1","demo","dileepkm6@gmail.com","111111111","111");
  // registerCompany()
  // {
  //   if(this.register.)
  // }
  dropDown() {
    this.dropDownOpen = !this.dropDownOpen;
  }
  onRegister() {
    var submitButton = <HTMLInputElement>document.getElementById("submitButton");
    submitButton.disabled = true;
    this.company = new Company(this.companyId.value, this.companyName.value, this.emailId.value, this.firstName.value, this.lastName.value, this.phone.value, this.password.value);
    console.log(this.company);
    this.register.registerCompany(this.company).subscribe(
      response => {
        console.log(response);
        // this.message = response;
        // this.errorMsg = false;
        // this.successMsg = true;
        this.toastr.success("Please verify your email id to login.", "Registration Successful");
        submitButton.disabled = false;
      },
      error => {
        console.log(error.error);
        this.toastr.error("Comapany already registered");
        submitButton.disabled = false;

        // this.message = error.error;
        // this.successMsg = false;
        // this.errorMsg = true;

      }

    );
  }

  closeModel() {
    this.modalService.dismissAll();
  }
}

