import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyownerService } from '../../services/companyowner.service';
import { EmployeeService } from 'src/app/modules/landingpage/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companyowner',
  templateUrl: './companyowner.component.html',
  styleUrls: ['./companyowner.component.css']
})
export class CompanyownerComponent implements OnInit {

  constructor(private fb: FormBuilder, private companyService: CompanyownerService, private empService: EmployeeService, private toaster: ToastrService) { }
  user: any;
  editProfileForm: FormGroup;
  profilePicFile: File;
  imgSrc: any;
  ngOnInit() {

    this.companyService.getOwner(JSON.parse(sessionStorage.getItem('user')).emailId).subscribe(
      (data) => {

        //console.log(data);
        this.user = data;
        this.imgSrc = this.user.profilePic;
        console.log(this.user);

        //console.log(this.user['company'].companyId);
        this.createForm();

      }
    )



  }
  createForm() {
    this.editProfileForm = this.fb.group({
      companyId: [{ value: this.user['company'].companyId, disabled: true }],
      emailId: [{ value: this.user.emailId, disabled: true }],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      phone: [this.user.phone],
    })
  }
  get companyId() { return this.editProfileForm.get('companyId'); }
  get emailId() { return this.editProfileForm.get('emailId'); }
  get firstName() { return this.editProfileForm.get('firstName'); }
  get lastName() { return this.editProfileForm.get('lastName'); }
  get phone() { return this.editProfileForm.get('phone'); }

  updateProfile() {
    this.companyService.updateProfile(this.emailId.value, this.firstName.value, this.lastName.value, this.phone.value).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
        this.toaster.success("Profile updated successfully");
      },
      (error) => {
        console.log(error);
      }
    )
  } 

  onChange(event) {
    console.log(event);
    this.profilePicFile = event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(this.profilePicFile);
    fr.onload = () => {
      this.imgSrc = fr.result;
      this.updateProfilePic();
    }

  }


  updateProfilePic() {
    let formData = new FormData();
    formData.append('profilePic', this.profilePicFile);
    formData.append('emailId', this.emailId.value);
    this.empService.updateProfilePic(formData).subscribe(
      data => {
        console.log(data);
        this.toaster.success("Profile picture updated successfully");
      }
    )
  }
}
