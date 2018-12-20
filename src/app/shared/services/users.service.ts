import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';
import {BaseApi} from '../core/base-api';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class UsersService extends BaseApi {
  constructor(
      public http: HttpClient) {
    super(http);
  }

  getAllUsers(type: string): Observable<User[]> {
    return this.get(`users`).pipe(
      map((response: Array<User>) => {
        if (type === 'full') {
          return response;
        } else {
          return response.filter((item: User) => item.type !== 'admin');
        }
      })
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`).pipe(map ((users: Array<User>) => users[0] ? users[0] : undefined ));
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }

  deleteUser(user: User): Observable<User> {
    return this.delete(`users/${user.id}`);
  }

}
