import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SupportService } from '../../../landingpage/services/support.service';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  ContactUsForm: FormGroup;
  errorMsg: boolean;
  successMsg: boolean;


  constructor(private fb: FormBuilder, private modalService: NgbModal, private toastr: ToastrService, private supportService: SupportService) { }



  ngOnInit() {
    this.ContactUsForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.pattern("^[a-zA-Z_]+[0-9._\\.a-zA-Z]+@[a-z0-9.-]+[\\.]+([a-z]{2,4})$")]],
      phone: ['', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      issue: ['', Validators.required],
      message: ['', [Validators.required]],
    })


  }
  get emailId() { return this.ContactUsForm.get('emailId'); }
  get firstName() { return this.ContactUsForm.get('firstName'); }
  get lastName() { return this.ContactUsForm.get('lastName'); }
  get phone() { return this.ContactUsForm.get('phone'); }
  get issue() { return this.ContactUsForm.get('issue'); }
  get message() { return this.ContactUsForm.get('message'); }
  // }
  // onSendMessage() {
  //   this.company = new Company(this.companyId.value, this.companyName.value, this.emailId.value, this.phone.value, this.password.value);
  //   console.log(this.company);
  //   this.register.registerCompany(this.company).subscribe(
  //     response => {
  //       console.log(response.body);
  //       this.successMsg = true;
  //       this.errorMsg = false;
  //     }
  showToaster() {
    this.toastr.success("Message sent successfully. We will be in touch shortly.", null)
  }


  onSendMessage() {
    let contactFormData = this.ContactUsForm.value;
    this.supportService.contactUs(contactFormData).subscribe(
      response => {
        console.log(response);
        this.successMsg = true;
        this.errorMsg = false;
      }
    )
  }
}

