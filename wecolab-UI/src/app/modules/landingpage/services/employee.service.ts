import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }


  empRegister(employeeFormData: FormData) {
    return this._http.post(environment.userServiceURL + "api/v1/user/employeeRegister", employeeFormData, { responseType: 'text' });
  }


  recoverAccount(email: string) {
    return this._http.put(environment.userServiceURL + "api/v1/user/forgetPassword", email,{responseType:'text'});
  }

  changePassword(emailId: string, currentPassword: string, newPassword: string) {
    return this._http.put(environment.userServiceURL + "api/v1/user/changePassword", { "emailId": emailId, "currentPassword": currentPassword, "newPassword": newPassword }, { responseType: 'text' });
  }

  updateProfile(emailId: string, firstName: string, lastName: string, phone: string) {
    return this._http.put(environment.userServiceURL + "api/v1/user/updateProfile", { "emailId": emailId, "firstName": firstName, "lastName": lastName, "phone": phone }, { responseType: 'text' })
  }

  getUserByEmailId(emailId: string) {
    return this._http.get(environment.userServiceURL + "api/v1/user/getUserByEmailId?emailId=" + emailId);
  }

  updateProfilePic(formData: FormData) {
    return this._http.post(environment.userServiceURL + "api/v1/user/updateProfilePic", formData, { responseType: 'text' });
  }
  getProfilePic(emailId: string) {
    return this._http.get(environment.userServiceURL + "api/v1/user/getProfilePic?emailId=" + emailId, { responseType: 'text' });
  }
}
