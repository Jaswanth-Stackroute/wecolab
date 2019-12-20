import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormBuilder } from '@angular/forms';
import { AdministrationService } from '../../services/administration.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private administrationService: AdministrationService, private fb: FormBuilder, private confirmDialog: ConfirmationDialogService, private toaster: ToastrService) { }

  addEmployeeForm: FormGroup;
  users: User[];
  conferencerooms: any;
  presentationrooms: any;
  company: any;
  numOfMember: number;
  allVideoRooms: number;
  allPresentationRooms: number;
  ngOnInit() {
    this.company = JSON.parse(sessionStorage.getItem('user'))['company'];
    console.log(this.company);
    this.administrationService.getAllUsers(this.company.id).subscribe(
      (data) => {
        this.users = data;
        this.numOfMember = this.users.length;
        console.log(this.users);
      }
    )
    this.administrationService.getAllConferenceRooms(this.company.id).subscribe(
      (data) => {
        this.conferencerooms = data;
        this.allVideoRooms = this.conferencerooms.length;
        console.log(this.conferencerooms);
      }
    )
    this.administrationService.getAllPresentationRooms(this.company.id).subscribe(
      (data) => {
        this.presentationrooms = data;
        this.allPresentationRooms = this.presentationrooms.length;
        console.log(this.presentationrooms);

      }
    )


    this.addEmployeeForm = this.fb.group(
      {
        emailId: []
      }
    )

  }
  get emailId() { return this.addEmployeeForm.get('emailId'); }

  removeEmployee(userId: number) {

    console.log("deleteEmployee");
    this.confirmDialog.confirm('Please confirm..', 'Do you really want to  remove.. ?')
      .then((confirmed) => {
        if (confirmed === true) {
          this.administrationService.deleteEmployee(userId).subscribe(
            data => {
              console.log(data);
              this.ngOnInit();
            }
          )
        }
        else {
          console.log("clicked cancel");
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  addMember() {
    //console.log((JSON.parse(sessionStorage.getItem('user'))['company'].id));
    this.administrationService.addEmployee(this.emailId.value, (JSON.parse(sessionStorage.getItem('user'))['company'].id)).subscribe(
      (data) => {
        console.log(data);
        this.toaster.success(data);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
