import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';


// langingpagemodule
import { MainPageComponent } from '../app/modules/landingpage/components/main-page/main-page.component';

// chatroommodule
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  // employeeModule
  { path: 'page-not-found', component: PageNotFoundComponent },
  // adminModule
  { path: 'access-denied', component: AccessDeniedComponent },
  // {path:'Admin-home/administration', component:AdminAdministrationComponent}
  // {
  //   path: '**', component: PageNotFoundComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
