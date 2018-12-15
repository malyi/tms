import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WavesModule} from 'angular-bootstrap-md';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WavesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ]
})
export class NotificationsModule { }
