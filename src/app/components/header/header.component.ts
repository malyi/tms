import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {AuthService} from '../../shared/services/auth.service';
import {UserStatusService} from '../../shared/services/user-status.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentRouteIndex: boolean;

  mainLinks = [
    {
      title: 'Home',
      handle: '/'
    },
    {
      title: 'About',
      handle: 'about'
    },
    {
      title: 'Contact',
      handle: 'contact'
    }
  ];
  systemLinks = [];
  userLink = {};
  isLogged: boolean;
  userName: string;
  user: object;

  constructor(
      private localStorageService: LocalStorageService,
      private authService: AuthService,
      private userStatus: UserStatusService,
      private router: Router) {
      this.userStatus.getStatus().subscribe((status: object) => {
        this.isLogged = status['status'];
        this.initUserName(this.isLogged);
      });

  }

  ngOnInit () {
    this.isLogged = this.authService.isLoggedIn();
    this.initUserName(this.isLogged);
  }

  initUserName(status: boolean) {
    if (status) {
      this.user = this.localStorageService.get('user');
      this.userName = this.user['firstName'] + ' ' + this.user['lastName'];
      this.userLink = {title: 'Profile', handle: '/account/profile'};

      if (this.user['type'] === 'admin') {
        this.systemLinks = [
          {
            title: 'Task List',
            handle: '/system/tasks'
          },
          {
            title: 'User List',
            handle: '/system/users'
          }
        ];
      } else {
        this.systemLinks = [
          {
            title: 'Task List',
            handle: '/system/tasks-user'
          }
        ];
      }
    } else {
      this.userName = 'Guest';
      this.userLink = {title: 'Login', handle: '/account/login'};
    }
  }

  onLogout() {
    this.authService.logout();
    this.userStatus.setStatus(false);
    this.router.navigate(['/']);
  }
}
