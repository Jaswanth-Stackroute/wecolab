import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: 'loggedIn', component: ChatComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ChatroomRoutingModule { }

