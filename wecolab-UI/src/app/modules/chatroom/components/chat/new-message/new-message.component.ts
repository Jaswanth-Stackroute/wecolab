import {Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ChattingService, Group, GroupDetails, Recent, User} from '../../../Shared/chatting.service';
import {CreateGroupComponent} from '../create group/group.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  @ViewChild('messageComponent', {static: false, read: ViewContainerRef}) messageComponent;
  private userSelected: boolean;
  private selectedUser: number;
  private userList: User[] = [];
  private groupList: GroupDetails[] = [];

  constructor(private chatService: ChattingService,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.chatService.filteredGroupsBehavior.subscribe((data) => {
      this.groupList = data;
    });
    this.chatService.filteredUsersBehavior.subscribe((data) => {
      this.userList = data;
    });
    this.userList = JSON.parse(window.localStorage.getItem('userList'));
    this.chatService.allGroupsBehavior.subscribe((data) => {
      this.groupList = data;
    });
  }

  showMessages(user: User) {
    this.userSelected = true;
    this.selectedUser = user.id;
    this.chatService.showMessages(this.selectedUser);
    this.chatService.showMessagesService.next({selectedUser : this.selectedUser, userSelected: this.userSelected});
    this.chatService.showRecentMessages.next();
  }
  sendGroupMessage(group: GroupDetails) {
    if (this.chatService.getUserAllGroups().includes(group)) {
      this.userSelected = false;
      this.selectedUser = group.id;
      this.chatService.showGroupMessages(this.selectedUser);
      this.chatService.showMessagesService.next({selectedUser : this.selectedUser, userSelected: this.userSelected});
      this.chatService.showRecentMessages.next();
    } else {
      this.userSelected = false;
      this.selectedUser = group.id;
      this.chatService.getGroupMessages(this.selectedUser);
      this.chatService.showMessagesService.next({selectedUser : this.selectedUser, userSelected: this.userSelected});
      this.chatService.showRecentMessages.next();
    }
  }

  setDefaultPic(user: User, i: number) {
    this.userList[i].profilePic = 'https://ptetutorials.com/images/user-profile.png';
  }
}
