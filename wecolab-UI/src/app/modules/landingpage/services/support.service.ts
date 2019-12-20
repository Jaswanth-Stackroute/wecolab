import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private _http: HttpClient) { }

  contactUs(contactUsFormData: any) {
    return this._http.post(environment.userServiceURL + "api/v1/contactUs", contactUsFormData, { responseType: 'text' });
  }
}
