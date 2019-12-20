import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { User } from 'src/app/models/user';
import { EmployeeRegistrationComponent } from '../employee-registration/employee-registration.component';
import { ToastrService } from 'ngx-toastr';
import { ChattingService } from '../../../chatroom/Shared/chatting.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private modalService: NgbModal, private toastr: ToastrService, private chatService: ChattingService) { }
  email: string;
  password: string;
  invalidLogin = false;
  user: User;

  ngOnInit() {
  }
  checkSignIn() {

    this.authenticationService.authenticate(this.email, this.password).
      subscribe(
        data => {
          console.log(data);
          this.user = data;
          console.log(this.user);
          this.invalidLogin = false;
          if (this.user.role == 'USER') {
            if (this.user.firstName == null && this.user.lastName == null) {
              this.modalService.dismissAll();
              this.modalService.open(EmployeeRegistrationComponent, { centered: true, backdrop: false });
            } else {
              this.modalService.dismissAll();
              const user = JSON.parse(window.sessionStorage.getItem('user'));
              this.chatService.connect(user);
              this.router.navigateByUrl('/loggedIn');
            }
          } else if (this.user.role == 'OWNER') {
            this.modalService.dismissAll();
            const user = JSON.parse(window.sessionStorage.getItem('user'));
            this.chatService.connect(user);
            this.router.navigateByUrl('/company/administration');
          } else if (this.user.role == 'WECOLAB') {
            this.modalService.dismissAll();
            this.router.navigateByUrl('/wecolab/administration');
          }

        },
        error => {
          console.log(error);
          this.invalidLogin = true,
            this.toastr.error('Invalid Credentials');
        }
      );
  }
  onClickForgetPassword() {
    this.modalService.dismissAll();
    this.modalService.open(ForgetPasswordComponent, { size: 'sm', centered: true, backdrop: false });
  }

  closeModel() {
    this.modalService.dismissAll();
  }
}
