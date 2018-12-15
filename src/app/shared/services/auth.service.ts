import {LocalStorageService} from './local-storage.service';
import {User} from '../models/user.model';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  private isAuthenticated = false;
  private user: User;

  constructor(private localStorageService: LocalStorageService) {
    this.user = JSON.parse(this.localStorageService.get('user'));
    this.isAuthenticated = !!this.user;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): User {
    return this.user;
  }

  login(user: User) {
    if (!this.user){
      this.localStorageService.set('user', JSON.stringify(user));
      this.isAuthenticated = true;
    }
  }

  logout() {
    if (this.user){
      this.localStorageService.remove('user');
      this.isAuthenticated = false;
    }
  }
}
