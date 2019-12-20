import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, ChildActivationEnd } from '@angular/router';
import { AdminhomeComponent } from './components/adminhome/adminhome.component'
import { AdminAdministrationComponent } from './components/admin-administration/admin-administration.component';
import { GoalsComponent } from './components/goals/goals.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChangePasswordComponent } from '../admin/components/change-password/change-password.component';


const routes: Routes = [
  // { path: '', redirectTo: '/wecolab', pathMatch: 'full' },
  {
    path: 'wecolab', component: AdminhomeComponent, canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_WECOLAB']
    },
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'administration', component: AdminAdministrationComponent,
        data: {
          allowedRoles: ['ROLE_WECOLAB']
        },
      },
      {
        path: 'Goals', component: GoalsComponent,
        data: {
          allowedRoles: ['ROLE_WECOLAB']
        },
      },
      {
        path: 'Change_Password', component: ChangePasswordComponent,
        data: {
          allowedRoles: ['ROLE_WECOLAB']
        },
      }
    ]

  }]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
