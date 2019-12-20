import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyownerService {

  constructor(private _http: HttpClient) { }

  updateProfile(emailId: string, firstName: string, lastName: string, phone: string) {
    return this._http.put(environment.userServiceURL + "api/v1/user/updateProfile", { "emailId": emailId, "firstName": firstName, "lastName": lastName, "phone": phone }, { responseType: 'text' })
  }

  getOwner(emailId: string) {
    return this._http.get(environment.userServiceURL + "api/v1/user/getUserByEmailId?emailId=" + emailId);
  }
}
