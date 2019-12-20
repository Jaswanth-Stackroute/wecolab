import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChattingService, Group, GroupDetails, User} from '../../../Shared/chatting.service';
import {MatListOption} from '@angular/material';

@Component({
  selector: 'app-group',
  templateUrl: './inviteUsers.component.html',
  styleUrls: ['./inviteUsers.component.css']
})
export class InviteUsersComponent implements OnInit {
  private group: GroupDetails;
  private usersList: User[];
  dummyUsersList: User[] = [];
  user: any;
  private element: HTMLElement;

  // tslint:disable-next-line:variable-name
  private _searchTerm: string;

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.dummyUsersList = this.usersList.filter(user => {
      return user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  constructor(private dialogRef: MatDialogRef<InviteUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private  chatService: ChattingService) {
    this.group = this.data.details;
  }

  ngOnInit(): void {
    this.chatService.getUsersOfGroup(this.group.id).subscribe(data => {
      const groupMembers = data;
      this.dummyUsersList = this.usersList = JSON.parse(window.localStorage.getItem('userList'));
      this.dummyUsersList = this.usersList = this.usersList.filter( data => {
        return !groupMembers.includes(data.id);
      });
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  inviteUser(selected: MatListOption[]) {
    selected.map((user) => {
      this.chatService.inviteUsers({
          groupId: this.group.id,
          userId: user.value.id,
        }, this.group.name).subscribe((response) =>{
          console.log(response);
      });
    });
    this.dialogRef.close();
  }
}
