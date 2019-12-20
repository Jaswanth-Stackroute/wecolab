import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule} from '@angular/forms';
import {ChatComponent} from './components/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {CreateGroupComponent} from './components/chat/create group/group.component';
import {InviteUsersComponent} from './components/chat/inviteUsers/inviteUsers.component';
import {ChatroomRoutingModule} from './chatroom-routing.module';
import {MessageComponent, SendFileConfirmationComponent} from './components/chat/message/message.component';
import { NewMessageComponent } from './components/chat/new-message/new-message.component';
import { RecentMessagesComponent } from './components/chat/recent-messages/recent-messages.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {ToastrModule} from 'ngx-toastr';
import { NotificationComponent } from './components/chat/notification/notification.component';
import { NgHighlightModule } from 'ngx-text-highlight';
import {HighlightPipe} from './components/chat/message/highlight.pipe';
import { ImageDisplayComponent } from './components/chat/image-display/image-display.component';



@NgModule({
  declarations: [
    ChatComponent,
    CreateGroupComponent,
    InviteUsersComponent,
    MessageComponent,
    NewMessageComponent,
    RecentMessagesComponent,
    SendFileConfirmationComponent,
    NotificationComponent,
    HighlightPipe,
    ImageDisplayComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ChatroomRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    NgHighlightModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    MatMenuModule
  ],
  providers: [],
  entryComponents: [
    CreateGroupComponent,
    InviteUsersComponent,
    MessageComponent,
    NewMessageComponent,
    RecentMessagesComponent,
    SendFileConfirmationComponent,
    NotificationComponent,
    ImageDisplayComponent
  ]
})

export class ChatroomModule { }



