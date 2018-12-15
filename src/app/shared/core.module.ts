import {NgModule} from '@angular/core';
import {UsersService} from './services/users.service';
import {AuthService} from './services/auth.service';
import {LocalStorageService} from './services/local-storage.service';

@NgModule({
  providers: [
    UsersService,
    AuthService,
    LocalStorageService
  ]
})

export class CoreModule {}
