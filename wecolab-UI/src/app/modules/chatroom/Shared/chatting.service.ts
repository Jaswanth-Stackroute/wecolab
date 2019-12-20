import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import {retry} from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  companyId: number;
  phone: number;
  profilePic: string;
}

export interface Message {
  conversationId: number;
  fromId: number;
  toId: number;
  dateTime: string;
  content: string;
  groupMessage: boolean;
}

export interface Group {
  groupId: number;
  userId: number;
}

export interface GroupDetails {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  adminId: number;
  teamId: number;
}

export interface File {
  fileid: number;
  fromid: number;
  toid: number;
  ext: string;
  lastext: string;
  filename: string;

}


export interface Recent {
  name: string;
  id: number;
  isGroup: boolean;
  lastMessage: string;
  message: string;
  profilePic: string;
}

export interface Notification {
  conversationId: number;
  fromId: number;
  toId: number;
  groupId: number;
  groupName: string;
  dateTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  webSocketEndpoint = environment.chatServiceURL + 'socket';

  private url = environment.chatServiceURL + 'api/files';
  private url1 = environment.chatServiceURL;
  stompClient: any;
  // userList: User[];
  userList: any;
  userListBehaviour: BehaviorSubject<any>;
  messageList: Message[] = [];
  private recentUsers: Recent[] = [];
  recentUsersBehaviour: BehaviorSubject<any>;
  private filteredrecentUsers: Recent[] = [];
  filteredrecentUsersBehavior: BehaviorSubject<any>;
  private filteredUsers  = [];
  filteredUsersBehavior: BehaviorSubject<any>;
  private filteredGroups = [];
  filteredGroupsBehavior: BehaviorSubject<any>;
  private allGroups: GroupDetails[] = [];
  allGroupsBehavior: BehaviorSubject<any>;
  messageListBehavior: BehaviorSubject<any>;
  public fromId: number;
  showMessagesService: Subject<any>;
  showRecentMessages: Subject<any>;
  fileListBehavior: BehaviorSubject<any>;
  fileList: File[] = [];
  private isFocus = true;
  private notifications: Notification[] = [];
  notificationBehavior: BehaviorSubject<any>;
  connected = false;
  connectedBehavior: BehaviorSubject<any>;
  teamAllGroups: any;
  roomsData = [];
  roomNotification: Notification[] = [];

  constructor(private http: HttpClient, private toast: ToastrService) {
    this.userListBehaviour = new BehaviorSubject<any>(this.userList);
    this.messageListBehavior = new BehaviorSubject<any>(this.messageList);
    this.recentUsersBehaviour = new BehaviorSubject<any>(this.recentUsers);
    this.showMessagesService = new Subject<any>();
    this.showRecentMessages = new Subject<any>();
    this.fileListBehavior = new BehaviorSubject<any>(this.fileList);
    this.filteredrecentUsersBehavior = new BehaviorSubject<any>(this.filteredrecentUsers);
    this.filteredUsersBehavior = new BehaviorSubject<any>(this.filteredUsers);
    this.filteredGroupsBehavior = new BehaviorSubject<any>(this.filteredGroups);
    this.allGroupsBehavior = new BehaviorSubject<any>(this.allGroups);
    this.notificationBehavior = new BehaviorSubject<any>(this.notifications);
    this.connectedBehavior = new BehaviorSubject<any>(this.connected);
  }

  getUserList(id: number): Observable<User[]> {
    return this.http.get<User[]>(environment.userServiceURL + 'api/v1/user/getUserByCompanyId?id=' + id);
    // return this.http.get<User[]>(environment.chatServiceURL + 'usersList');
  }

  saveUser(formData: FormData) {
      return this.http.post(this.url, formData, {responseType: 'text'});
  }

  getConnectionStatus() {
    return this.connected;
  }

  downloadFileSystem(fromid: number, toid: number, ext: string, filename: string, fileid: number): Observable<HttpResponse<Blob>> {
      let headers = new HttpHeaders();
      headers = headers.append('Accept', ext);
      return this.http.get(this.url1 + '/api/download/' + filename + '/' + fromid + '/' + toid + '/' + fileid, {
        headers,
        observe: 'response',
        responseType: 'blob'
      });
  }

  getAllGroups() {
    return this.teamAllGroups;
  }

  getUserAllGroups() {
    return this.allGroups;
  }

  connect(user) {
    this.messageList = [];
    this.getUserList(user.company.id).subscribe(data => {
      this.userList = data;
      window.localStorage.setItem('userList', JSON.stringify(this.userList));
    });
    // this.http.get('https://my-json-server.typicode.com/rajender97/srikanthdemo/users').subscribe(data => {
    //     this.userList = data;
    //     console.log(data);
    //     window.localStorage.setItem('userList', JSON.stringify(this.userList));
    //   });


    this.fromId = user.userId;
    const topic = '/message/' + user.userId;
    const topic1 = '/message/file/' + user.userId;

    console.log('connecting ...');

    const ws = new SockJS(this.webSocketEndpoint);

    this.stompClient = Stomp.over(ws);
    // tslint:disable-next-line:variable-name
    const _this = this;
    _this.stompClient.connect({}, () => {
      this.connected = true;
      this.connectedBehavior.next(true);
      _this.stompClient.subscribe('/message/allGroups/' + user.userId, (data) => {
        this.allGroups = (JSON.parse(data.body));
        this.allGroupsBehavior.next(this.allGroups);
        if (this.messageList.length !== 0) {
          this.recentMessages();
        }
        if (!this.allGroups.some( group => group.id === user.company.id)) {
          if (user.role === 'OWNER') {
            const groupDetails: GroupDetails = {
              id : user.company.id,
              name: user.company.companyName,
              description: 'all staff members',
              createdAt: this.convertDate(),
              adminId: this.fromId,
              teamId: user.company.id
            };
            this.stompClient.send('/app/chat.newGroup', {}, JSON.stringify(groupDetails));
          } else {
            const group: Group = {
              groupId: user.company.id,
              userId: this.fromId
            };
            const message: Message = {
              conversationId: new Date().valueOf() ,
              fromId: 0,
              content: this.getUser(group.userId).name +  ' joined group',
              dateTime: this.convertDate(),
              toId: group.groupId,
              groupMessage: true
            };
            this.http.post(environment.chatServiceURL + 'joinGroup/' + user.company.id, group, {responseType: 'text'}).subscribe();
            this.stompClient.send('/app/chat.groupMessage/' + group.groupId, {}, JSON.stringify(message));
          }
        }
      });

      _this.stompClient.subscribe(topic1, (data) => {
        this.fileList = this.fileList.concat(JSON.parse(data.body));
        this.fileListBehavior.next(this.fileList);
      });

      _this.stompClient.subscribe(topic, (data) => {
        if (this.messageList.length !== 0 && JSON.parse(data.body).length !== 0) {
          this.messageList = this.messageList.concat(JSON.parse(data.body));
          if (JSON.parse(data.body).groupMessage) {
            const group: GroupDetails = _this.getGroup(JSON.parse(data.body).toId);
            this.showNotification(group.name, JSON.parse(data.body).content)
          } else {
            const user: User = _this.getUser(JSON.parse(data.body).fromId);
            this.showNotification(user.name, JSON.parse(data.body).content);
          }
          this.recentMessages();
        } else {
          this.messageList = this.messageList.concat(JSON.parse(data.body));
          // this.messageListBehavior.next(this.messageList);
          setTimeout(() => {
            this.recentMessages();
          }, 1000);
        }
      });
      _this.stompClient.subscribe('/message/notification/' + user.userId, (data) => {
        this.notifications = (JSON.parse(data.body));
        this.notificationBehavior.next(this.notifications);
      });

      const loggedInUser: User = {
        id: user.userId,
        name: user.firstName,
        companyId: user.company.id,
        email: user.emailId,
        phone: user.phone,
        profilePic: 'djfjd'
      };
      _this.stompClient.send('/app/login', {}, JSON.stringify(loggedInUser));

      if (user.role === 'OWNER') {
        this.http.get(environment.chatServiceURL + '/owner/allGroups/' + user.company.id + '/' + user.userId)
          .subscribe(data => {
            this.teamAllGroups = data;
          });
      }
      this.http.get(environment.presentationServiceURL + 'api/v1/getRoomParticipantByUserId/' + this.fromId)
        .subscribe(data => {
          // this.roomsData.concat(data);
          this.convertRoomData(data);
          this.http.get(environment.roomServiceURL + 'api/v1/getRoomParticipantByUserId/' + this.fromId)
            .subscribe(data1 => {
              this.convertRoomData(data1);
              // this.roomsData.concat(data1);
            });
        });
    }, () => {
      console.log('error callBack');
      this.messageList = [];
      this.connect(user);
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('disconnected');
  }

  sendMessage(value: any) {
    const message: Message = {
      conversationId: new Date().valueOf(),
      fromId: this.fromId,
      content: value.content,
      dateTime: this.convertDate(),
      toId: value.toId,
      groupMessage: false
    };
    this.messageList.push(message);
    this.showMessages(this.fromId);
    this.stompClient.send('/app/chat.sendMessage/' + this.fromId + '/' + value.toId, {}, JSON.stringify(message));
  }

  createGroup(groupName: string, groupId: number, description: string) {
    const groupDetails: GroupDetails = {
      id : groupId,
      name: groupName,
      description,
      createdAt: this.convertDate(),
      adminId: this.fromId,
      teamId: JSON.parse(sessionStorage.getItem('user')).company.id
    };
    this.stompClient.send('/app/chat.newGroup', {}, JSON.stringify(groupDetails));
  }

  inviteUsers(group: Group, name: string) {
    const notification: Notification = {
      conversationId: new Date().valueOf(),
      fromId: this.fromId,
      toId: group.userId,
      groupId: group.groupId,
      dateTime: this.convertDate(),
      groupName: name
    };
    return this.http.post(environment.chatServiceURL + '/group/invitation', notification);
  }

  rejectInvitation(id: number) {
    return this.http.get(environment.chatServiceURL +  '/group/deleteInvitation/' + id, {responseType: 'text'});
  }

  joinGroup(group: Group) {
    const message: Message = {
      conversationId: new Date().valueOf(),
      fromId: 0,
      content: this.getUser(group.userId).name +  ' joined group',
      dateTime: this.convertDate(),
      toId: group.groupId,
      groupMessage: true
    };
    const teamId = JSON.parse(sessionStorage.getItem('user')).company.id;
    this.http.post(environment.chatServiceURL + 'joinGroup/' + teamId , group, {responseType: 'text'}).subscribe(
      (data) => {
        this.stompClient.send('/app/chat.groupMessage/' + group.groupId, {}, JSON.stringify(message));
      }
    );
  }

  convertRoomData(roomsData) {
    this.roomNotification = [];
    for (let i = 0; i < roomsData.length; i++) {
      const meetingDate = new Date(roomsData[i].sqlDate + ' ' + roomsData[i].sqlTime);
      if (meetingDate.valueOf() > new Date().valueOf()) {
        this.roomNotification.push({
          dateTime: '',
          fromId: roomsData[i].adminId,
          groupId: 0,
          groupName: 'You have a meeting scheduled on ' + roomsData[i].sqlDate + ' at ' + roomsData[i].sqlTime + ' ' +
            '\n \n Meeting agenda :- ' + roomsData[i].agenda ,
          toId: this.fromId,
          conversationId: roomsData[i].id
        });
      }
    }
    this.notifications = this.notifications.concat(this.roomNotification);
    this.notificationBehavior.next(this.notifications);
  }

  sendGroupMessage(value: any) {
    const message: Message = {
      conversationId: new Date().valueOf(),
      fromId: this.fromId,
      content: value.content,
      dateTime: this.convertDate(),
      toId: value.toId,
      groupMessage: true
    };
    this.messageList.push(message);
    this.showGroupMessages(value.toId);
    this.stompClient.send('/app/chat.groupMessage/' + value.toId, {}, JSON.stringify(message));
  }

  showMessages(id: number) {
    this.messageListBehavior.next(this.messageList.filter((data: Message) => {
      if ((data.toId === id && data.fromId === this.fromId) ||
        (data.toId === this.fromId && data.fromId === id)) {
        return true;
      }
    }));
  }

  showGroupMessages(id: number) {
    this.messageListBehavior.next(this.messageList.filter((data: Message) => {
      if (data.toId === id) { return true; }
    }));
  }

  deleteMessages(id: number) {
    this.messageList = this.messageList.filter((data: Message) => {
      if (data.toId !== id) {
        console.log(data.content);
        return true;
      }
    });
    this.messageListBehavior.next(this.messageList);
    this.recentMessages();
    if (this.recentUsers[0].isGroup) {
      this.showMessagesService.next({ selectedUser: this.recentUsers[0].id, userSelected: false});
    } else {
      this.showMessagesService.next({ selectedUser: this.recentUsers[0].id, userSelected: true});
    }
  }

  getUsersOfGroup(groupId: number): Observable<number[]> {
    return this.http.get<number[]>(environment.chatServiceURL + 'usersList/' + groupId);
  }

  recentMessages() {
    this.recentUsers = [];
    const recentMessages = [];
    let user: User;
    let group: GroupDetails;
    const recentUserIds = [];
    let message: Message;
    let i: number;
    let content: string;

    for (i = this.messageList.length - 1; i >= 0; i--) {
      message = this.messageList[i];
      if (!recentUserIds.includes(message.fromId) && message.fromId !== this.fromId) {
        if (message.groupMessage && !recentUserIds.includes(message.toId)) {
          recentUserIds.push(message.toId);
          recentMessages.push(message);
        } else if (!recentUserIds.includes(message.toId)) {
          recentUserIds.push(message.fromId);
          recentMessages.push(message);
        }
      } else if (!recentUserIds.includes(message.toId) && message.toId !== this.fromId) {
        recentUserIds.push(message.toId);
        recentMessages.push(message);
      }
    }
    for (message of recentMessages) {
      if (message.content.length > 20) {
        content = message.content.substring(0, 20) + '......';
      } else {
        content = message.content;
      }
      if (!message.groupMessage) {
        if (message.fromId !== this.fromId) {
          user = this.getUser(message.fromId);
        } else {
          user = this.getUser(message.toId);
        }
        this.recentUsers.push({ name: user.name, id: user.id, isGroup: false, lastMessage: message.dateTime, message: content , profilePic: user.profilePic });
      } else {
        group = this.getGroup(message.toId);
        this.recentUsers.push({ name: group.name, id: group.id, isGroup: true, lastMessage: message.dateTime, message: content, profilePic: 'hvhvh'});
      }
    }
    this.recentUsersBehaviour.next(this.recentUsers);
  }

  getUser(id1: number): User {
    this.userList = JSON.parse(window.localStorage.getItem('userList'));
    return this.userList.find(({ id }) => id === id1);
  }
  getGroup(groupId: number): GroupDetails {
    if (this.allGroups.find(({ id }) => id === groupId)) {
      return this.allGroups.find(({ id }) => id === groupId);
    } else {
      return this.teamAllGroups.find( ({ id }) => id === groupId);
    }
  }

  convertDate(): string {
    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return day + '-' + (monthIndex + 1) + '  ' + hours + ':' + minutes;
  }

  exitGroup(groupId: number) {
    const group: Group = {
      groupId,
      userId: this.fromId
    };
    const message: Message = {
      conversationId: new Date().valueOf(),
      fromId: 0,
      content: this.getUser(this.fromId).name + ' left the group ' ,
      dateTime: this.convertDate(),
      toId: groupId,
      groupMessage: true
    };
    this.stompClient.send('/app/chat.groupMessage/' + groupId, {}, JSON.stringify(message));
    const teamId = JSON.parse(sessionStorage.getItem('user')).company.id;
    this.http.post<string>(environment.chatServiceURL + 'groupList/' + teamId, group).subscribe((data) => {});
  }

  sendFile(value: any) {
    const file: File = {
      fromid: this.fromId,
      toid: value.toId,
      lastext: value.lastext,
      ext: value.ext1,
      filename: value.fileName1,
      fileid: value.fileid

    };
    this.fileList.push(file);
    this.fileListBehavior.next(this.fileList);
    this.stompClient.send('/app/chat.sendFile/' + this.fromId + '/' + value.toId, {}, JSON.stringify(file));
  }

  sendGroupFile(value: any) {
    const file: File = {
      fromid: this.fromId,
      toid: value.toId,
      lastext: value.lastext,
      ext: value.ext1,
      filename: value.fileName1,
      fileid: value.fileid

    };
    this.fileList.push(file);
    this.fileListBehavior.next(this.fileList);
    this.stompClient.send('/app/chat.groupFile/' + value.toId, {}, JSON.stringify(file));
  }

  showFiles(id: number) {
    this.fileListBehavior.next(this.fileList.filter((data: File) => {
      if ((data.toid === id && data.fromid === this.fromId) ||
        (data.toid === this.fromId && data.fromid === id)) {
        return true;
      }
    }));
  }

  showGroupFiles(id: number) {
    this.fileListBehavior.next(this.fileList.filter( (data: File) => {
      if (data.toid === id ) { return true; }
    }));
  }

  showNotification(name, content) {
    if (document.hasFocus()) {
      this.toast.success(name, content);
    } else {
      const options = {
        body: content,
        icon: '../../favicon.ico'
      };
      const notification = new Notification('Received a new message from ' + name, options);
      notification.onclick = (event) => {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open('http://localhos:4200/loggedIn');
      };
    }
  }

  editGroupInfo(groupDetails: GroupDetails): Observable<GroupDetails> {
    const id = this.allGroups.findIndex( obj => obj.id === groupDetails.id);
    this.allGroups[id] = groupDetails;
    this.allGroupsBehavior.next(this.allGroups);
    this.recentMessages();
    const message: Message = {
      conversationId: new Date().valueOf(),
      fromId: 0,
      content: this.getUser(this.fromId).name + ' changed the group name to ' + groupDetails.name,
      dateTime: this.convertDate(),
      toId: groupDetails.id,
      groupMessage: true
    };
    this.stompClient.send('/app/chat.groupMessage/' + groupDetails.id , {}, JSON.stringify(message));
    return this.http.put<GroupDetails>(environment.chatServiceURL + 'group/edit', groupDetails);
  }

  getGroupMessages(groupId: number) {
     this.http.get<Message[]>(environment.chatServiceURL + '/owner/groupMessages/ ' + groupId)
              .subscribe(data => {
                this.messageListBehavior.next(data);
                console.log(data);
              });
  }
}
