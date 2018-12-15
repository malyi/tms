import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// @ts-ignore
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.toastr.success('Register Successful, please login');
    // });
  }

}
