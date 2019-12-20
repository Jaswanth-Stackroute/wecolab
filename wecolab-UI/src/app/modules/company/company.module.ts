// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AdministrationComponent } from './components/administration/administration.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { CompanyownerComponent } from './components/companyowner/companyowner.component';
// import { GroupsComponent } from './components/groups/groups.component';
// import { RoomsComponent } from './components/rooms/rooms.component';
// import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
// import { MainContentComponent } from './components/main-content/main-content.component';
// import { CompanyRoutingModule } from './company-routing.module';

// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import {HttpClientModule} from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



// @NgModule({
//   declarations: [AdministrationComponent, NavbarComponent, FooterComponent, CompanyownerComponent, GroupsComponent, RoomsComponent, ConfirmationDialogComponent, MainContentComponent],
//   imports: [
//     CommonModule,
//     CompanyRoutingModule,
//     NgMultiSelectDropDownModule.forRoot(),
//     HttpClientModule
//   ],
//   exports: [AdministrationComponent, NavbarComponent, FooterComponent, CompanyownerComponent, GroupsComponent, RoomsComponent, ConfirmationDialogComponent, MainContentComponent]

// })
// export class CompanyModule { }



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';

import { AdministrationComponent } from './components/administration/administration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanyownerComponent } from './components/companyowner/companyowner.component';
import { GroupsComponent } from './components/groups/groups.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { CompanyRoutingModule } from './company-routing.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingpageModule } from '../../modules/landingpage/landingpage.module';

//services
import { GroupService } from './services/group.service';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RoomService } from '../employee/services/room.service';
import { PaymentComponent } from './components/payment/payment.component';
import { PresentationRoomComponent } from './components/presentation-room/presentation-room.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    GroupsComponent,
    AdministrationComponent,
    RoomsComponent,
    CompanyownerComponent,
    ConfirmationDialogComponent,
    MainContentComponent,
    ChangePasswordComponent,
    PaymentComponent,
    PresentationRoomComponent
  ],
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
  exports: [AdministrationComponent, NavbarComponent, FooterComponent, CompanyownerComponent, GroupsComponent, RoomsComponent, ConfirmationDialogComponent, MainContentComponent],
  providers: [GroupService, ConfirmationDialogService,RoomService],
  // bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})

export class CompanyModule { }
