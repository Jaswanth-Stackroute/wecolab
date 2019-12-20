import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';



import { ProfileComponent } from './emp_components/profile/profile.component';
import { GroupsComponent } from './emp_components/groups/groups.component';
import { FooterComponent } from './emp_components/footer/footer.component';
import { NavbarComponent } from './emp_components/navbar/navbar.component';
import { EmpMainContentComponent } from './emp_components/emp-main-content/emp-main-content.component';
import { RoomsComponent } from './emp_components/rooms/rooms.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from './services/room.service';
import { PresentationroomService } from './services/presentationroom.service';
import { PresentationRoomComponent } from './emp_components/presentation-room/presentation-room.component';
import { ChangePasswordComponent } from './emp_components/change-password/change-password.component';
import { LandingpageModule } from '../../modules/landingpage/landingpage.module';




@NgModule({
  declarations: [ProfileComponent, GroupsComponent, FooterComponent, NavbarComponent, EmpMainContentComponent, RoomsComponent, PresentationRoomComponent, ChangePasswordComponent,],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    LandingpageModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [NavbarComponent, FooterComponent, ProfileComponent, GroupsComponent, RoomsComponent, EmpMainContentComponent],
  //providers: [GroupService,ConfirmationDialogService],
  // bootstrap: [AppComponent],
  //entryComponents: [ ConfirmationDialogComponent ],
  providers: [RoomService, PresentationroomService]
})
export class EmployeeModule { }
