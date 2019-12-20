import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminAdministrationComponent } from './components/admin-administration/admin-administration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GoalsComponent } from './components/goals/goals.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
@NgModule({
  declarations: [AdminAdministrationComponent, GoalsComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    HttpClientModule

  ],
  exports: [AdminAdministrationComponent, GoalsComponent],
})
export class AdminModule { }
