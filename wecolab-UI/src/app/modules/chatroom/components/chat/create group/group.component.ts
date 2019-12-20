import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatListOption} from '@angular/material';
import {ChattingService, User} from '../../../Shared/chatting.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class CreateGroupComponent implements OnInit {
  private groupName: string;
  private usersList: User[];
  private loggedInUser;
  private groupDescription: string;

  constructor(private dialogRef: MatDialogRef<CreateGroupComponent>,
              private  chatService: ChattingService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup(selected: MatListOption[]) {
    const id = Math.floor(Math.random() * 10000) + 1;
    this.chatService.createGroup(this.groupName, id, this.groupDescription);
    selected.map((user) => {
      this.chatService.inviteUsers({
        groupId: id,
        userId: user.value.id,
      }, this.groupName).subscribe((response) => {
        console.log(response);
      });
    });
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.usersList = JSON.parse(window.localStorage.getItem('userList')).filter((data: User) => {
      return data.id !== this.loggedInUser.userId;
    });
  }

  disabled() {
    if (this.groupName.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
