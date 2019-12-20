import { Component, OnInit } from '@angular/core';
import {ChattingService, Group, Notification, User} from '../../../Shared/chatting.service';
import {ToastrService} from 'ngx-toastr';
import {not} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  loggedInUser;
  invitations: Notification[] = [];
  private userSelected: boolean;

  constructor(private chatService: ChattingService, private toast: ToastrService) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.chatService.notificationBehavior.subscribe((data) => {
      this.invitations = data;
    });
  }

  getUser(id: number) {
    if (id !== 0) {
      return this.chatService.getUser(id).name;
    } else {
      return null;
    }
  }

  showMessages(id: number) {
    this.chatService.showMessages(id);
    this.chatService.showMessagesService.next({ selectedUser: id, userSelected: true });
  }

  rejectInvitation(notification: Notification) {
    console.log('****************');
    if (notification.groupId !== 0) {
      this.chatService.rejectInvitation(notification.conversationId).subscribe((data: string) => {
        this.toast.success('Invitation has been rejected');
      });
    } else {
      console.log('****************');
      this.chatService.notificationBehavior.next( this.invitations.filter((data) => {
        return data.conversationId !== notification.conversationId;
      }));
    }
  }

  acceptInvitation(notification: Notification) {
    const group: Group = {
      groupId : notification.groupId,
      userId: notification.toId
    };
    this.chatService.joinGroup(group);
    this.chatService.rejectInvitation(notification.conversationId).subscribe((data: string) => {});
  }

}
