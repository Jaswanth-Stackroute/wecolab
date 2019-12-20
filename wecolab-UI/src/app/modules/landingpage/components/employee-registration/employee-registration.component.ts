import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ChattingService} from '../../../chatroom/Shared/chatting.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private register: EmployeeService, private router: Router, private modal: NgbModal, private chatService: ChattingService) { }

  employeeForm: FormGroup;
  profilePicFile: File;

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
      profilePic: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

  }
  get firstName() { return this.employeeForm.get('firstName'); }
  get lastName() { return this.employeeForm.get('lastName'); }
  get phone() { return this.employeeForm.get('phone'); }
  get profilePic() { return this.employeeForm.get('profilePic'); }
  get password() { return this.employeeForm.get('password'); }
  get confirmPassword() { return this.employeeForm.get('confirmPassword'); }
  onRegister() {
    let employeeFormData = new FormData();
    employeeFormData.append('firstName', this.firstName.value);
    employeeFormData.append('lastName', this.lastName.value);
    employeeFormData.append('emailId', JSON.parse(sessionStorage.getItem('user')).emailId);
    employeeFormData.append('profilePic', this.profilePicFile);
    employeeFormData.append('password', this.password.value);
    employeeFormData.append('phone', this.phone.value);

    this.register.empRegister(employeeFormData).subscribe(
      response => {
        console.log(response);
        this.modal.dismissAll();
        const user = JSON.parse(window.sessionStorage.getItem('user'));
        this.chatService.connect(user);
        this.router.navigateByUrl('/loggedIn');
      },
      (error) => console.log('error' + error)
    );
  }

  onChange(event) {
    this.profilePicFile = event.target.files[0];
  }

  closeModal() {
    this.modal.dismissAll();
  }
}
