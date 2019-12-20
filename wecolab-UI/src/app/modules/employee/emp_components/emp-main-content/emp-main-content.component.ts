import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/modules/landingpage/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployeeService } from 'src/app/modules/landingpage/services/employee.service';

@Component({
  selector: 'app-emp-main-content',
  templateUrl: './emp-main-content.component.html',
  styleUrls: ['./emp-main-content.component.css']
})
export class EmpMainContentComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private empService: EmployeeService) { }
  employee: any;
  imgSrc: any;
  ngOnInit() {
    this.empService.getUserByEmailId(sessionStorage.getItem('username')).subscribe(
      response => {
        this.employee = response;
        this.imgSrc = this.employee.profilePic;
      }
    )
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
}
