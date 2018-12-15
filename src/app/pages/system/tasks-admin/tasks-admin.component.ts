import { Component, OnInit } from '@angular/core';

import {ToastrService} from 'ngx-toastr';

import {TasksService} from '../../../shared/services/tasks.service';
import {Task} from '../../../shared/models/task.model';

@Component({
  selector: 'app-tasks-admin',
  templateUrl: './tasks-admin.component.html',
  styleUrls: ['./tasks-admin.component.scss']
})
export class TasksAdminComponent implements OnInit {

  tasksList: object[];
  private sorted = false;

  constructor(
    private tasksService: TasksService,
    private notification: ToastrService) { }

  ngOnInit() {
    this.tasksService.getAllTasks().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks;
    });
  }

  newTaskAdded(task: Task) {
    this.tasksList.push(task);
  }

  sortBy(by: string | any): void {

    this.tasksList.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }

  remove(task: Task, i) {
    this.tasksService.deleteTask(task).subscribe((data) => {
      this.tasksList.splice(i, 1);
      this.notification.info('Task deleted!');
    });
  }
}
