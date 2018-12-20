import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule
  ]
})

export class AuthModule {
}
