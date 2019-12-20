import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/modules/landingpage/services/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  

  constructor(private fb: FormBuilder, private empService: EmployeeService, private toastr:ToastrService) { }
  employee: any;
  editProfileForm: FormGroup;
  profilePicFile: File;
  imgSrc: any;
  ngOnInit() {
    this.empService.getUserByEmailId(JSON.parse(sessionStorage.getItem('user')).emailId).subscribe(
      (data) => {

        console.log(data);
        this.employee = data;
        console.log(this.employee)
        //console.log(this.employee.profilePic);
        this.imgSrc = this.employee.profilePic;
        this.createForm();
      }
    )
  }

  createForm() {
    console.log(this.employee.phone);
    this.editProfileForm = this.fb.group({
      companyId: [{ value: this.employee['company'].companyId, disabled: true }],
      emailId: [{ value: this.employee.emailId, disabled: true }],
      firstName: [this.employee.firstName],
      lastName: [this.employee.lastName],
      phone: [this.employee.phone],
    });
  }
  get emailId() { return this.editProfileForm.get('emailId'); }
  get companyId() { return this.editProfileForm.get('companyId'); }
  get firstName() { return this.editProfileForm.get('firstName'); }
  get lastName() { return this.editProfileForm.get('lastName'); }
  get phone() { return this.editProfileForm.get('phone'); }

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

  updateProfile() {
    this.empService.updateProfile(this.emailId.value, this.firstName.value, this.lastName.value, this.phone.value).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
        this.toastr.success("Profile updated successfully");
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateProfilePic() {
    let formData = new FormData();
    formData.append('profilePic', this.profilePicFile);
    formData.append('emailId', this.emailId.value);
    this.empService.updateProfilePic(formData).subscribe(
      data => console.log(data));
      this.toastr.success("Profile picture updated successfully")
    
  }
}
