import {AfterViewChecked, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ChattingService, Group, GroupDetails, Message, Recent, User} from '../../../Shared/chatting.service';
import { InviteUsersComponent } from '../inviteUsers/inviteUsers.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as fileSaver from 'file-saver';

import { SafeUrl } from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ImageDisplayComponent} from '../image-display/image-display.component';

export interface Links {
  links: SafeUrl;
  file_name: string;
  extension: string;
  fromId: number;
  toId: number;
}

export interface Data {
  fileName: string;
  fileExt: string;
}


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  private messages: Message[] = [];
  private searchMessages: Message[] = [];
  private content;
  private userSelected: boolean;
  private selectedUser: number;
  private selectedUserDetails: User = {
    name: 'wwwwww',
    id: 11111,
    email: 'sjbdjsb',
    companyId: 99,
    phone: 1111111111111111,
    profilePic: 'vghvhh'
  };
  private selectedGroupDetails: GroupDetails = {
    name: 'sdkjb',
    id: 111111,
    adminId: 111111,
    description: 'ssssssssssss',
    createdAt: 'ssssss',
    teamId: 1111111111111
  };
  private loggedInUser;
  @Input() data: { userSelected: boolean; selectedUser: number };
  private input: HTMLElement;
  private usersList: User[] = [];
  private groupMembers: number[] = [];

  private fileid: number;
  public userFile: any = File;
  private fileName: string;
  private ext: string;
  private lastext: string;
  private fromid1: number;
  private toid1: number;
  private exten1: string;
  private name1: string;
  private size: number;
  private fid: string;
  private files: File[] = [];
  private fileAttach: HTMLElement;
  private drawerToggle = true;
  searchTerm1: string;
  @ViewChild('scrollBottom', { static: false}) private scrollBottom: ElementRef;
  placeholder: string;
  isEditMode = false;
  isDesEditMode = false;
  allGroups: GroupDetails[] = [];
  canSendMessage = true;




  constructor(private chatService: ChattingService,
              private dialog: MatDialog,
              private toast: ToastrService) {
  }



  ngOnInit() {
    this.chatService.allGroupsBehavior.subscribe( (data) => {
        this.allGroups = data;
    });
    this.loggedInUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.selectedUser = this.data.selectedUser;
    this.userSelected = this.data.userSelected;
    this.chatService.messageListBehavior.subscribe((data) => {
      this.messages = data.sort( (t1, t2) => {
        return t1.conversationId - t2.conversationId;
      });
      this.removeDuplicates(this.messages, 'conversationId');
    });
    if (this.userSelected) {
      this.selectedUserDetails = this.chatService.getUser(this.selectedUser);
      this.placeholder = 'send message to ' + this.selectedUserDetails.name;
    } else {
      this.selectedGroupDetails = this.chatService.getGroup(this.selectedUser);
      this.placeholder = 'send message to ' + this.selectedGroupDetails.name;
      if (!this.allGroups.find( ({id}) => id === this.selectedUser)) {
        this.canSendMessage = false;
      }
    }

    this.chatService.getUsersOfGroup(this.selectedGroupDetails.id).subscribe((data) => {
      this.groupMembers = data;
    });


    setTimeout(() => {
      let i: number;
      for (i of this.groupMembers) {
        this.usersList.push(this.chatService.getUser(i));
      }
      this.input = document.getElementById('content');
      this.fileAttach = document.getElementById('files');
      if (this.input) {
        this.input.addEventListener('keyup', (event) => {
          if (event.code === 'Enter') {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            if  (this.content.length !== 0) {
              document.getElementById('msg_send_btn').click();
            }
          }
        });
      }
      document.getElementById('content').focus();
    }, 1000);


    this.chatService.fileListBehavior.subscribe((data) => {
      this.files = data;
      this.size = this.files.length;
      for (let i = 0; i < this.size; i++) {

        this.fromid1 = data[i].fromId;
        this.toid1 = data[i].toId;
        this.exten1 = data[i].ext1;
        this.name1 = data[i].fileName1;
      }
    });
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  removeDuplicates(originalArray, objKey) {
    const trimmedArray = [];
    const values = [];
    let value;

    for(let i = 0; i < originalArray.length; i++) {
      value = originalArray[i][objKey];

      if (values.indexOf(value) === -1) {
        trimmedArray.push(originalArray[i]);
        values.push(value);
      }
    }
    return trimmedArray;
  }

  set searchTerm(value: string) {
    this.searchTerm1 = value;
    this.searchMessages = this.messages.filter((message: Message) => {
      return message.content.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    if (value.length === 0) {
      this.searchMessages = [];
    }
  }

  sendMessage() {
    let value = {};
    if (this.userSelected) {
      value = {
        toId: this.selectedUser,
        content: this.content
      };
      this.chatService.sendMessage(value);
      this.chatService.showMessages(this.selectedUser);
      this.chatService.recentMessages();
    } else {
      value = {
        toId: this.selectedUser,
        content: this.content
      };
      this.chatService.sendGroupMessage(value);
      this.chatService.showGroupMessages(this.selectedUser);
      this.chatService.recentMessages();
    }
    this.content = '';
  }

  showMessages(user: User) {
    this.userSelected = true;
    this.selectedUser = user.id;
    this.chatService.showMessages(this.selectedUser);
    this.chatService.showMessagesService.next({ selectedUser: this.selectedUser, userSelected: this.userSelected });
  }
  showMessages2(id: number) {
    this.showMessages(this.chatService.getUser(id));
  }

  inviteUser() {
    const dialogRef = this.dialog.open(InviteUsersComponent, {
      width: '436px',
      height: '425px',
      data: { details: this.selectedGroupDetails },
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sendFileInit() {
    console.log(this.fileAttach);
    this.fileAttach.click();
  }

  exitGroup() {
    this.chatService.exitGroup(this.selectedGroupDetails.id);
    this.chatService.deleteMessages(this.selectedGroupDetails.id);
  }
  getUser(id: number) {
    if (id !== 0) {
      return this.chatService.getUser(id).name;
    } else {
      return null;
    }
  }

  fileupload(event) {
    const file = event.target.files[0];
    const size = event.target.files[0].size;
    this.ext = event.target.files[0].type;
    this.fileName = event.target.files[0].name;
    const dotPosition = this.fileName.indexOf('.');
    this.lastext = this.fileName.substring(dotPosition, this.fileName.length);
    this.userFile = file;
    if (size > 5000000) {
      confirm('Please enter within 5mb size');
    }
    this.openDialog2(this.fileName, this.ext);
  }

  downloadFileSystem(file) {
    this.chatService.downloadFileSystem(file.fromid, file.toid, file.ext, file.filename, file.fileid)
      .subscribe(
        response => {
          // const filename = response.headers.get('fileName');
          // const ext2=response.headers.get('exten');
          console.log('shhh');
          // console.log(filename);
          this.saveFile(response.body, file.ext, file.fileName1);
        },
      );
  }

  saveFile(data: any, ext3?: string, filename?: string) {
    const blob = new Blob([data], { type: ext3 || 'application/octet-stream' });
    fileSaver.saveAs(blob, filename);
  }


  sendFile() {
    let value = {};
    this.fileid = new Date().valueOf();
    if (this.userSelected) {
      value = {
        toId: this.selectedUser,
        fileName1: this.fileName,
        ext1: this.ext,
        lastext: this.lastext,
        //
        fileid: this.fileid
      };
      const formData = new FormData();

      formData.append('file', this.userFile);
      formData.append('fromid', this.chatService.fromId.toString());
      formData.append('toid', this.selectedUser.toString());
      formData.append('filename', this.fileName);
      formData.append('ext', this.ext);
      formData.append('lastext', this.lastext);
      //
      formData.append('fileid', this.fileid.toString());
      this.chatService.saveUser(formData).subscribe(res => {
        console.log(res);
      });
      this.chatService.sendFile(value);
      this.chatService.showFiles(this.selectedUser);

    } else {
      value = {
        toId: this.selectedUser,
        fileName1: this.fileName,
        ext1: this.ext,
        lastext: this.lastext,
        //
        fileid: this.fileid
      };
      const formData = new FormData();

      formData.append('file', this.userFile);
      formData.append('fromid', this.chatService.fromId.toString());
      formData.append('toid', this.selectedUser.toString());
      formData.append('filename', this.fileName);
      formData.append('ext', this.ext);
      formData.append('lastext', this.lastext);
       //
      formData.append('fileid', this.fileid.toString());
      this.chatService.saveUser(formData).subscribe(res => {
        console.log(res);
      });
      this.chatService.sendGroupFile(value);
      this.chatService.showGroupFiles(this.selectedUser);

    }
  }

  toggleDrawer() {
    this.drawerToggle = this.userSelected;
  }
  toggleDrawer2() {
    this.drawerToggle = true;
  }

  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch (err) { }
  }

  editGroupInfo(selectedGroupDetails: GroupDetails) {
    this.chatService.editGroupInfo(selectedGroupDetails).subscribe((data) => {
      this.toast.success('Group Details updated');
    });
  }

  openDialog2(filename: string, ext: string): void {
    const dialogRef = this.dialog.open(SendFileConfirmationComponent, {
      width: '500px',
      data: {fileName: filename, fileExt: ext}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.sendFile();
    });
  }

  randomColors() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  setDefaultPic() {
        this.selectedUserDetails.profilePic =  'https://ptetutorials.com/images/user-profile.png';
  }

  setDefaultPic1(i: number) {
    this.usersList[i].profilePic =  'https://ptetutorials.com/images/user-profile.png';
  }

  openDialog(event): void {
    const dialogRef = this.dialog.open(ImageDisplayComponent, {
      width: '320px',
      height: '400px',
      data: {user : this.selectedUserDetails},
      panelClass: 'myapp-no-padding-dialog'
    });
    dialogRef.updatePosition({top : event.pageY + 'px', left : event.pageX + 'px'});
  }
}

@Component({
  selector: 'app-sendfile',
  templateUrl: 'sendfile-confirmation.html',
  styleUrls: ['./message.component.css']
})
export class SendFileConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<SendFileConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
