import {
  Component,
  ComponentFactoryResolver, ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ChattingService, Group, GroupDetails, Recent, User } from '../../Shared/chatting.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { RecentMessagesComponent } from './recent-messages/recent-messages.component';
import { CreateGroupComponent } from './create group/group.component';
import { EmployeeService } from 'src/app/modules/landingpage/services/employee.service';
import { NotificationComponent } from './notification/notification.component';
import { AuthenticationService } from '../../../landingpage/services/authentication.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('messageComponent', { static: false, read: ViewContainerRef }) messageComponent;
  @ViewChild('listComponent', { static: false, read: ViewContainerRef }) listComponent;

  private loggedInUser;
  private userList: User[];
  private groupList: GroupDetails[];
  private selectedUser: number;
  private userSelected = false;
  content: string;
  recentUsers: Recent[];
  directMessage = false;
  loading: boolean;
  activeTab = 'all';
  permission: boolean;
  profilePic: any;
  userData;
  loggedInUser1: any;

  // tslint:disable-next-line:variable-name
  private _searchTerm: string;
  private invitations: Notification[] = [];

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.chatService.filteredrecentUsersBehavior.next(this.recentUsers.filter(user => {
      return user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }));
    this.chatService.filteredUsersBehavior.next(this.userList.filter(user => {
      return user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }));
    this.chatService.filteredGroupsBehavior.next(this.groupList.filter(user => {
      return user.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }));
  }


  constructor(private chatService: ChattingService,
              private dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private empService: EmployeeService,
              private authenticate: AuthenticationService) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.empService.getUserByEmailId(sessionStorage.getItem('username')).subscribe(
      (response) => {
        this.loggedInUser1 = response;
      }
    );

    if (performance.navigation.type === 0) {
      console.log('navigation');
    } else {
      this.chatService.connect(this.loggedInUser);
    }
    if (Notification.permission === 'granted') {
      this.permission = true;
    }
    this.chatService.connectedBehavior.subscribe((data) => {
      this.loading = !data;
    });
    this.loading = true;
    this.loading = !this.chatService.getConnectionStatus();
    this.userData = {
      selectedUser: this.loggedInUser.userId,
      userSelected: true
    };
    this.chatService.notificationBehavior.subscribe((data) => {
      this.invitations = data;
    });

    setTimeout(() => {
      this.chatService.allGroupsBehavior.subscribe((data) => {
        this.groupList = data;
      });
      this.userList = JSON.parse(window.localStorage.getItem('userList'));
      this.chatService.showMessagesService.subscribe((data) => {
        this.showMessages(data);
      });
      this.chatService.showRecentMessages.subscribe(() => {
        this.toggleComponentBack();
      });
      this.chatService.recentUsersBehaviour.subscribe((data) => {
        this.recentUsers = data;
      });
      this.showMessages({ selectedUser: this.loggedInUser.userId, userSelected: true });
    }, 1000);
  }
  setDefaultPic() {
    this.loggedInUser.profilePic = 'https://ptetutorials.com/images/user-profile.png';
  }

  toggleComponents() {
    document.getElementById('listComponent').innerHTML = '';
    this.listComponent.remove(0);
    const cmpFactory = this.cfr.resolveComponentFactory(NewMessageComponent);
    const componentRef = cmpFactory.create(this.injector);
    this.listComponent.insert(componentRef.hostView);
    this.directMessage = true;
  }

  toggleComponentBack() {
    this.listComponent.remove(0);
    const cmpFactory = this.cfr.resolveComponentFactory(RecentMessagesComponent);
    const componentRef = cmpFactory.create(this.injector);
    this.listComponent.insert(componentRef.hostView);
    this.directMessage = false;
  }

  showMessages(data: any) {
    this.messageComponent.remove(0);
    if (data.selectedUser !== this.loggedInUser.userId) {
      const cmpFactory = this.cfr.resolveComponentFactory(MessageComponent);
      const componentRef = cmpFactory.create(this.injector);
      componentRef.instance.data = { selectedUser: data.selectedUser, userSelected: data.userSelected };
      this.messageComponent.insert(componentRef.hostView);
    } else {
      const cmpFactory = this.cfr.resolveComponentFactory(NotificationComponent);
      const componentRef = cmpFactory.create(this.injector);
      // componentRef.instance.data = { selectedUser: data.selectedUser, userSelected: data.userSelected };
      this.messageComponent.insert(componentRef.hostView);
    }
  }

  filterUsers() {
    this.chatService.filteredrecentUsersBehavior.next(this.recentUsers.filter((user) => {
      return !user.isGroup;
    }));
    this.chatService.filteredUsersBehavior.next(this.userList.filter(user => {
      return true;
    }));
    this.chatService.filteredGroupsBehavior.next(this.groupList.filter(user => {
      return false;
    }));
    this.activeTab = 'users';
  }

  filterGroups() {
    this.chatService.filteredrecentUsersBehavior.next(this.recentUsers.filter((user) => {
      return user.isGroup;
    }));
    this.chatService.filteredUsersBehavior.next(this.userList.filter(user => {
      return false;
    }));
    this.chatService.filteredGroupsBehavior.next(this.groupList.filter(user => {
      return true;
    }));
    this.activeTab = 'groups';
  }

  allRecentMessages() {
    this.chatService.recentUsersBehaviour.next(this.recentUsers);
    this.chatService.filteredUsersBehavior.next(this.userList);
    this.chatService.filteredGroupsBehavior.next(this.groupList);
    this.activeTab = 'all';
  }

  enableNotification() {
    if ('Notification' in window) {
      Notification.requestPermission().then((status) => {
        console.log('user choice', status);
        if (status !== 'granted') {
          console.log('Notification permission not granted');
          this.permission = false;
        } else {
          this.permission = true;
        }
      });
    }
  }

  openDialog(event): void {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '436px',
      height: '425px',
      panelClass: 'myapp-no-padding-dialog'
    });
  }

  logOut() {
    this.authenticate.logOut();
    this.router.navigate(['']);
  }

  teamGroups() {
    this.chatService.filteredUsersBehavior.next(this.userList.filter(user => {
      return false;
    }));
    this.chatService.filteredGroupsBehavior.next(this.chatService.getAllGroups());
    this.activeTab = 'OWNER';
  }
}


