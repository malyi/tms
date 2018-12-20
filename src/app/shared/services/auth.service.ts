import {LocalStorageService} from './local-storage.service';
import {User} from '../models/user.model';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

    private isAuthenticated = false;
    private user: object;

    constructor(private localStorageService: LocalStorageService) {
        this.user = this.localStorageService.get('user');
        this.isAuthenticated = !!this.user;
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }


    login(user: User) {
        this.localStorageService.set('user', JSON.stringify(user));
        this.isAuthenticated = true;
    }

    logout() {
        this.localStorageService.remove('user');
        this.isAuthenticated = false;
    }
}
