import {NgModule} from '@angular/core';
import {UsersService} from './services/users.service';
import {AuthService} from './services/auth.service';
import {LocalStorageService} from './services/local-storage.service';
import {TasksService} from './services/tasks.service';
import {MailerService} from './services/mailer.service';

@NgModule({
  providers: [
    UsersService,
    AuthService,
    TasksService,
    LocalStorageService,
    MailerService
  ]
})

export class CoreModule {}
