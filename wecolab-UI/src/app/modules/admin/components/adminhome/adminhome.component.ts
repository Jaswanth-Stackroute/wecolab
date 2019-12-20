import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExcelServicesService } from '../../services/excel-services.service';
import { AuthenticationService } from 'src/app/modules/landingpage/services/authentication.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  title = 'excel-upload-download';
  toggled: boolean = false;
  ngOnInit() {
  }
  excel = [];
  constructor(private excelService: ExcelServicesService, private http: HttpClient, private authenticationService: AuthenticationService, private router: Router, private adminService: AdminService) {
    this.getJSON().subscribe(data => {
      data.forEach(row => {
        this.excel.push(row);
      });
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, 'sample');
  }
  public getJSON(): Observable<any> {
    return this.http.get('https://api.myjson.com/bins/zg8of');
  }
  SignOut() {
    if (this.authenticationService.isUserLoggedIn()) {
      console.log(sessionStorage.getItem('username') + " is logged out");
      this.authenticationService.logOut();
      this.router.navigateByUrl('');
    }

  }
}




