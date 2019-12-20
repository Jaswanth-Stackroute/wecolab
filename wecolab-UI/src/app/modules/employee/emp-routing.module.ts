import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './emp_components/profile/profile.component';
import { RoomsComponent } from './emp_components/rooms/rooms.component';
import { EmpMainContentComponent } from './emp_components/emp-main-content/emp-main-content.component';
import { GroupsComponent } from './emp_components/groups/groups.component';
import { PresentationRoomComponent } from './emp_components/presentation-room/presentation-room.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChangePasswordComponent } from './emp_components/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'emp-main', component: EmpMainContentComponent, canActivate: [AuthGuard], data: {
      allowedRoles: ['ROLE_USER']
    },
    canActivateChild: [AuthGuard],
    children:
      [
        {
          path: 'emp-room', component: RoomsComponent,
          data: {
            allowedRoles: ['ROLE_USER']
          }
        },
        {
          path: 'profile', component: ProfileComponent,
          data: {
            allowedRoles: ['ROLE_USER']
          }
        },
        {
          path: 'emp-groups', component: GroupsComponent,
          data: {
            allowedRoles: ['ROLE_USER']
          }
        },
        {
          path: 'presentation-room', component: PresentationRoomComponent,
          data: {
            allowedRoles: ['ROLE_USER']
          }
        },
        {
          path: 'change-password', component: ChangePasswordComponent,
          data: {
            allowedRoles: ['ROLE_USER']
          }
        }
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpRoutingModule { }
