import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MainPageComponent } from './components/main-page/main-page.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { CreatenewcompanyComponent } from './components/createnewcompany/createnewcompany.component';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { TermsconditionsComponent } from './components/termsconditions/termsconditions.component';
import { ContactusComponent } from './components/contactus/contactus.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [
      { path: 'signin', component: EmployeeLoginComponent },
      { path: 'newCompany', component: CreatenewcompanyComponent },
      { path: 'emp-registration', component: EmployeeRegistrationComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },

    ]

  }, { path: 'Terms&Conditions', component: TermsconditionsComponent },
  { path: 'contact', component: ContactusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }