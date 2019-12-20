import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }
  getAllCompany() {
    //console.log(sessionStorage.getItem('token'));
    return this._http.get(environment.userServiceURL + "api/v1/user/getMemberByRole?role=OWNER");
  }
  getAllVideoRooms() {
    return this._http.get(environment.roomServiceURL + "api/v1/getAllRoom")
  }
  getAllConferenceRooms() {
    return this._http.get(environment.presentationServiceURL + "api/v1/getAllRoom")
  }

  getEmployeesByCompanyId(id: any) {
    return this._http.get<any>(environment.userServiceURL + "api/v1/user/getUserByCompanyId?id=" + id);
  }

  deleteCompany(emailId: string) {
    return this._http.delete(environment.userServiceURL + "api/v1/user/deleteCompany?emailId=" + emailId, { responseType: 'text' });
  }
  getAllGroups()
  {
    return this._http.get(environment.chatServiceURL+"")
  }
}
