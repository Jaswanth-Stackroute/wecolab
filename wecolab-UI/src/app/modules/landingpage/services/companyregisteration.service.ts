import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Company } from '../components/createnewcompany/company';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyregisterationService {

  private _http: HttpClient
  constructor(handler: HttpBackend) {
    this._http = new HttpClient(handler);
  }
  registerCompany(company: Company) {
    console.log(company);
    return this._http.post(environment.userServiceURL + "api/v1/company/registerCompany", company, { responseType: 'text' });
  }
  // getAllMember()
  // {
  //   return this._http.get<any>("http://172.23.239.94:8081/api/v1/company/members");
  // }
  // addMember(emailId:string)
  // {
  //   this._http.post<any>("http://172.23.239.94:8081/api/v1/company/addMember",{emailId});
  // }
  // deleteMember(emailId:string)
  // {
  //   this._http.delete<any>("http://172.23.239.94:8081/api/v1/company/deleteMember?emailId="+emailId);
  // }
  getMember(emailId: string) {
    return this._http.get<any>(environment.userServiceURL + 'api/v1/getMember?emailId=' + emailId);
  }
}
