import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';


import { CreatenewcompanyComponent } from './components/createnewcompany/createnewcompany.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CommonModule } from '@angular/common';


import { CompanyregisterationService } from './services/companyregisteration.service';
import { HttpClientModule } from '@angular/common/http';
import { PasswordValidatorDirective } from '../../shared/password-validator.directive';
import { EmailValidatorDirective } from '../../shared/email-validator.directive';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminhomeComponent } from '../admin/components/adminhome/adminhome.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { TermsconditionsComponent } from './components/termsconditions/termsconditions.component';
import { ContactusComponent } from './components/contactus/contactus.component';



@NgModule({
  declarations: [
    CreatenewcompanyComponent,
    EmployeeLoginComponent,
    LogoutComponent,
    MainPageComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    AdminhomeComponent,
    EmployeeRegistrationComponent,
    ForgetPasswordComponent,
    TermsconditionsComponent,
    ContactusComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    
    BrowserAnimationsModule,
    ToastContainerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-full-width',
      closeButton: true,
      preventDuplicates: true,



    })
  ],
  exports: [CreatenewcompanyComponent, EmployeeLoginComponent, LogoutComponent, MainPageComponent, AdminhomeComponent, PasswordValidatorDirective],
  providers: [CompanyregisterationService],
})
export class LandingpageModule { }
