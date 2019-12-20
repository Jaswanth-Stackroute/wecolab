import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private _http: HttpClient) { }
  getEmployees(id: any) {
    return this._http.get<any>(environment.userServiceURL + "api/v1/user/getUserByCompanyId?id=" + id);
  }

  getAllUsers(id: any) {
    return this._http.get<any>(environment.userServiceURL + "api/v1/user/getAllUserByCompanyId?id=" + id);
  }

  deleteEmployee(id: number) {
    return this._http.delete(environment.userServiceURL + "api/v1/user/removeMember?memberId=" + id, { responseType: 'text' });
  }
  addEmployee(emailId: string, companyId: number) {
    return this._http.post(environment.userServiceURL + "api/v1/user/addMember", { "emailId": emailId, "companyId": companyId }, { responseType: 'text' });
  }
  getAllConferenceRooms(id: number) {
    return this._http.get<any>(environment.roomServiceURL + "api/v1/getRoomByCompanyId/" + id)
  }
  getAllPresentationRooms(id: number) {
    return this._http.get<any>(environment.presentationServiceURL + "api/v1/getRoomByCompanyId/" + id)
  }
}
