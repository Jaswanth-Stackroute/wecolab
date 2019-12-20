import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeLoginComponent } from '../employee-login/employee-login.component';
import { CreatenewcompanyComponent } from '../createnewcompany/createnewcompany.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { EmployeeRegistrationComponent } from '../employee-registration/employee-registration.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css', '../../../../../assets/css/bootstrap.min.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  constructor(private modalService: NgbModal, private authenticationService: AuthenticationService, private router: Router) { }

  ngAfterViewInit(): void {


  }
  user: any;
  role: string;
  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.role = JSON.parse(sessionStorage.getItem('user')).role;
      console.log(this.role);
    }
  }
  employeeLogin() {
    this.modalService.open(EmployeeLoginComponent, { size: 'sm', centered: true, backdrop: false, });
  }
  companyRegistration() {
    this.modalService.open(CreatenewcompanyComponent, { centered: true, backdrop: false, });
  }
  chatPage() {
    this.router.navigate(['/chatroom']);
  }
  Name: string;
  get isUserLoggedIn() {

    if (this.authenticationService.isUserLoggedIn()) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.Name = sessionStorage.getItem('username');
      this.Name = this.Name.substring(0, this.Name.indexOf('@'));
      return true;
    }
    return false;
  }

  logOut() {
    if (this.authenticationService.isUserLoggedIn()) {
      console.log(sessionStorage.getItem('username') + " logged out");
      this.authenticationService.logOut();
    }
  }
}
