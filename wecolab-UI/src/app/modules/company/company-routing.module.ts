import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { NotificationsComponent } from './components/notifications/notifications.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { CompanyownerComponent } from './components/companyowner/companyowner.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PresentationRoomComponent } from './components/presentation-room/presentation-room.component';
const routes: Routes = [
  {
    path: 'company', component: MainContentComponent, canActivate: [AuthGuard],
    data: {
      allowedRoles: ['ROLE_OWNER']
    },
    canActivateChild: [AuthGuard],
    children:
      [
        {
          path: 'room', component: RoomsComponent,
          data: {
            allowedRoles: ['ROLE_OWNER']
          },
        },
        {
          path: 'presentation-room', component: PresentationRoomComponent,
          data: {
            allowedRoles: ['ROLE_OWNER']
          },
        },
        {
          path: 'company', component: CompanyownerComponent,
          data: {
            allowedRoles: ['ROLE_OWNER']
          },
        },
        {
          path: 'groups', component: GroupsComponent,
          data: {
            allowedRoles: ['ROLE_OWNER']
          },
        },
        {
          path: 'administration', component: AdministrationComponent,
          data: {
            allowedRoles: ['ROLE_OWNER']
          },
        },
        {
          path: 'change-password', component: ChangePasswordComponent,
          data: {
            allowedRoles: ['ROLE_OWNER']
          },
        },
        {
          path: 'payNow', component: PaymentComponent,
          data: {
            allowedRoles: ['ROLE_OWNER']
          },
        }
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyRoutingModule { }
