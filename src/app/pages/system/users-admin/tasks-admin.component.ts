import {Component, OnInit, ViewChild} from '@angular/core';

import {ToastrService} from 'ngx-toastr';

import {TasksService} from '../../../shared/services/tasks.service';
import {Task} from '../../../shared/models/task.model';
import {EditTaskComponent} from './edit-task/edit-task.component';

@Component({
  selector: 'app-tasks-admin',
  templateUrl: './tasks-admin.component.html',
  styleUrls: ['./tasks-admin.component.scss']
})
export class TasksAdminComponent implements OnInit {

  private sorted = false;
  tasksList: object[];
  searchValue = '';
  searchPlaceholder = 'Title';
  searchField = 'title';


  @ViewChild('editTask') editTask: EditTaskComponent;

  constructor(
    private tasksService: TasksService,
    private notification: ToastrService) { }

  ngOnInit() {
    this.tasksService.getAllTasks().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks;
    });
  }

  sortBy(by: string | any, key: string): void {
    this.tasksList.sort((a: any, b: any) => {
      let sortA;
      let sortB;

      if (typeof a[by] === 'object') {
        sortA = a[by][key];
        sortB = b[by][key];
      } else {
        sortA = a[by];
        sortB = b[by];
      }
      if (sortA < sortB) {
        return this.sorted ? 1 : -1;
      }
      if (sortA > sortB) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }

  newTaskAdded(task: Task) {
    this.tasksList.push(task);
  }

  editedTask(task: Task) {
    const taskIndex = this.tasksList.findIndex((item: Task) => item.id === task.id);
    this.tasksList[taskIndex] = task;

  }

  remove(task: Task) {
    const taskIndex = this.tasksList.findIndex((item: Task) => item.id === task.id );
    this.tasksService.deleteTask(task).subscribe((data) => {
      this.searchValue = '';
      this.tasksList.splice(taskIndex, 1);
      this.notification.info('Task deleted!');
    });
  }

  editTaskOpen(task: Task) {
    this.editTask.open(task);
  }


  changeCriteria(field: string) {
    const namesMap = {
      title: 'Title',
      description: 'Description',
      author: 'Created by',
      user: 'Assigned to',
      status: 'Status',
      progress: 'Progress'
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
