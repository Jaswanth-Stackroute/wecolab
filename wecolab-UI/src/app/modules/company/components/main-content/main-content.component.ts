import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/landingpage/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployeeService } from 'src/app/modules/landingpage/services/employee.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  user: any;
  imgSrc: any;
  userName: string;
  constructor(private authenticationService: AuthenticationService, private router: Router, private empService: EmployeeService) { }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.empService.getUserByEmailId(this.user.emailId).subscribe(
      data => {
        this.user = data;
        this.imgSrc = this.user.profilePic;
        this.userName = this.user.firstName + " " + this.user.lastName;
      }
    )
    // console.log(this.user);
  }
  public isCollapsed = false;
  public toggled = false;
  logOut() {
    if (this.authenticationService.isUserLoggedIn()) {
      console.log(sessionStorage.getItem('username') + " is logged out");
      this.authenticationService.logOut();
      this.router.navigateByUrl('');
    }
  }
  payNow() {
    this.router.navigateByUrl("/company/payNow");
  }
}
