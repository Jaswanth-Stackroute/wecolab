import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from 'src/app/http-interceptors/interceptor';

// modules
import { CompanyModule } from './modules/company/company.module';
import { CompanyRoutingModule } from './modules/company/company-routing.module';

// employeeModule
import { EmployeeModule } from './modules/employee/employee.module';
import { EmpRoutingModule } from './modules/employee/emp-routing.module';

// AdminModules
import { AdminModule } from './modules/admin/admin.module';

// LandingPage
import { LandingpageModule } from './modules/landingpage/landingpage.module';
import { LandingPageRoutingModule } from './modules/landingpage/landing-page-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ChatBox
import { ChatroomModule } from './modules/chatroom/chatroom.module';
import { ChatroomRoutingModule } from './modules/chatroom/chatroom-routing.module';

// screensharing
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { JwtModule } from '@auth0/angular-jwt';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // CompanyModule
    CompanyModule,
    CompanyRoutingModule,
    // employeeModule
    EmployeeModule,
    EmpRoutingModule,
    // adminModule
    AdminModule,
    // landingpage
    LandingpageModule,
    LandingPageRoutingModule,
    BrowserAnimationsModule,
    // Chatmodule
    ChatroomRoutingModule,
    ChatroomModule,
    // ScreenSharing
    BrowserAnimationsModule,
    ToastContainerModule,
    ToastrModule.forRoot({
    timeOut: 3000,
    positionClass: 'toast-top-center',
    closeButton:true,
    preventDuplicates:true,
  }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        }
      }
    })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
