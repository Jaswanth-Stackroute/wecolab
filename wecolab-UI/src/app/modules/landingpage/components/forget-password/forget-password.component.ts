import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private emplService: EmployeeService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
  }
  email: string;
  forgetPassword() {
    if (this.email == null) {
      this.toastr.error("Please enter email");
      return;
    }

    return this.emplService.recoverAccount(this.email).subscribe(
      response => {
        console.log(response);
        if (response == "success") {
          this.toastr.success("Recovery password sent on Email. Please check.")

        } else if (response == "invalid") {
          this.toastr.error("Invalid Email Id. Kindly register");
        } else if (response == "notEnabled") {
          this.toastr.error("Kindly verify Email Id");

        }

      },
      error => {
        console.log(error);
        this.toastr.error();
      }
    );
  }

  closeModel() {
    this.modalService.dismissAll();
  }
}
