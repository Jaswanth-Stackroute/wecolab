import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ChattingService, Recent} from '../../../Shared/chatting.service';
import {MessageComponent} from '../message/message.component';
import {CreateGroupComponent} from '../create group/group.component';
import {MatDialog} from '@angular/material/dialog';
import {ImageDisplayComponent} from '../image-display/image-display.component';

@Component({
  selector: 'app-recent-messages',
  templateUrl: './recent-messages.component.html',
  styleUrls: ['./recent-messages.component.css']
})
export class RecentMessagesComponent implements OnInit {

  @ViewChild('messageComponent', {static: false, read: ViewContainerRef}) messageComponent;
  private recentUsers: Recent[];
  private userSelected: boolean;
  private selectedUser: number;

  constructor(private chatService: ChattingService, private cfr: ComponentFactoryResolver, private injector: Injector, private dialog: MatDialog,) { }

  ngOnInit() {
    this.chatService.filteredrecentUsersBehavior.subscribe((data) => {
      this.recentUsers = data;
    });
    this.chatService.recentUsersBehaviour.subscribe( (data) => {
      this.recentUsers = data;
    });

  }
  showMessages(user: Recent, event: Event) {
    if (!user.isGroup) {
      this.userSelected = true;
      this.selectedUser = user.id;
      this.chatService.showMessages(this.selectedUser);
      this.chatService.showFiles(this.selectedUser);
    } else {
      this.userSelected = false;
      this.selectedUser = user.id;
      this.chatService.showGroupMessages(this.selectedUser);
      this.chatService.showGroupFiles(this.selectedUser);
    }
    this.chatService.showMessagesService.next({selectedUser : this.selectedUser, userSelected: this.userSelected});
  }




  setDefaultPic(user: Recent, i: number) {
    if (user.isGroup) {
        this.recentUsers[i].profilePic =  'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-8-512.png';
    } else {
        this.recentUsers[i].profilePic =  'https://ptetutorials.com/images/user-profile.png';
    }
  }
}
