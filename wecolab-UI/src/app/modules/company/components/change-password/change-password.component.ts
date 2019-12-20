import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/modules/landingpage/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private empService: EmployeeService, private toastr:ToastrService) { }
  passwordChangeForm: FormGroup;
  successMsg: boolean = false;
  message: string;
  ngOnInit() {
    this.passwordChangeForm = this.fb.group(
      {
        emailId: [{ value: (JSON.parse(sessionStorage.getItem('user')).emailId), disabled: true }],
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        newConfirmPassword: ['', [Validators.required]]
      }
    )

  }

  get emailId() { return this.passwordChangeForm.get('emailId'); }
  get currentPassword() { return this.passwordChangeForm.get('currentPassword'); }
  get newPassword() { return this.passwordChangeForm.get('newPassword'); }
  get newConfirmPassword() { return this.passwordChangeForm.get('newConfirmPassword'); }

  onPasswordChange() {
    this.empService.changePassword(this.emailId.value, this.currentPassword.value, this.newPassword.value).subscribe
      (
        data => {
          console.log(data);
          this.message = data;
          this.successMsg = true;
          if(data == "invalid_current_password"){
            this.toastr.error("Invalid current password")
          }
          else if (data == "password_changed"){
            this.toastr.success("Password changed successfully.")
          }
        }
        ,
        error => {
          console.log(error);
        }
      )
  }
}
