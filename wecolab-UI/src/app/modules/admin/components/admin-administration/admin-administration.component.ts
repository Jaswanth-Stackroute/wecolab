import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { ConfirmationDialogService } from 'src/app/modules/company/services/confirmation-dialog.service';

@Component({
  selector: 'app-admin-administration',
  templateUrl: './admin-administration.component.html',
  styleUrls: ['./admin-administration.component.css']
})
export class AdminAdministrationComponent implements OnInit {
  totalConferenceRooms: any;
  constructor(private adminService: AdminService, private confirmDialog: ConfirmationDialogService) { }

  users: any;

  ngOnInit() {
    this.getAllCompanyInfo();
    this.adminService.getAllVideoRooms().subscribe(
      (data) => {
        this.users = data;
        this.totalVideoRooms = this.users.length;
        console.log(this.users)
      }
    )
    this.adminService.getAllConferenceRooms().subscribe(
      (data) => {
        this.users = data;
        this.totalConferenceRooms = this.users.length;
        console.log(this.users)
      }
    )
    this.adminService.getAllGroups().subscribe(
      (data) =>{
        this.users =data;
        this.totalGroups=this.users.length;
        console.log(this.users)
      }
    )
  }

  ownerData: User[];
  totalCompany: number;
  totalVideoRooms: number;
  totalGroups:number;

  getAllCompanyInfo() {
    this.adminService.getAllCompany().subscribe(
      (data: any) => {
        console.log(data);
        this.ownerData = data;
        this.totalCompany = this.ownerData.length;
        // this.owner = this.companyData[0].daouser;
        // console.log(this.companyData[['daouser']]);
        console.log(this.ownerData);
        //console.log(this.ownerData[1].company.registeredOn.getMonth());
      }
    )
  }

  deleteCompany(emailId: string) {

    this.confirmDialog.confirm('Please confirm..', 'Do you really want to  remove.. ?')
      .then((confirmed) => {
        if (confirmed === true) {
          this.adminService.deleteCompany(emailId).subscribe
            (
              (response) => {
                this.ngOnInit();
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            )
        }
        else {
          console.log("clicked cancel");
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
