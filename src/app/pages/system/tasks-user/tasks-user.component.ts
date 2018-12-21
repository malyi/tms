import {Component, OnInit, ViewChild} from '@angular/core';

import {TasksService} from '../../../shared/services/tasks.service';
import {ToastrService} from 'ngx-toastr';
import {Task} from '../../../shared/models/task.model';
import {TableService} from '../../../shared/services/table.service';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {ViewTaskComponent} from './view-task/view-task.component';

@Component({
  selector: 'app-tasks-user',
  templateUrl: './tasks-user.component.html',
  styleUrls: ['./tasks-user.component.scss']
})
export class TasksUserComponent implements OnInit {

  private sorted = false;
  tasksList: object[];
  searchValue = '';
  searchPlaceholder = 'Title';
  searchField = 'title';
  user: object;


  @ViewChild('viewTask') viewTask: ViewTaskComponent;

  constructor(
      private tasksService: TasksService,
      private tableService: TableService,
      private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.user = this.localStorageService.get('user');
    this.tasksService.getTasksByUserId(this.user['id']).subscribe((tasks: any) => {
      this.tasksList = tasks;
    });
  }

  sortBy(by: string | any, key: string): void {
    this.sorted = this.tableService.sort(this.sorted, this.tasksList, by, key);
  }

  viewedTask(task: Task) {
    const taskIndex = this.tasksList.findIndex((item: Task) => item.id === task.id);
    this.tasksList[taskIndex] = task;
  }

  viewTaskOpen(task: Task) {
    this.viewTask.open(task);
  }


  changeCriteria(field: string) {
    const namesMap = {
      title: 'Title',
      description: 'Description',
      author: 'Created by',
      status: 'Status',
      progress: 'Progress'
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
