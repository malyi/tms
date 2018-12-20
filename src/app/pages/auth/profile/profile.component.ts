import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {TasksService} from '../../../shared/services/tasks.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: object;
  tasksQty: number;

  constructor(
      private localStorageService: LocalStorageService,
      private tasksService: TasksService) {
  }

  ngOnInit() {
    this.user = this.localStorageService.get('user');
    this.tasksService.getTasksByUserId(this.user['id']).subscribe((tasks: any) => {
      this.tasksQty = tasks.length;
    });
  }
}
