import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import {TasksService} from '../../../shared/services/tasks.service';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {Task} from '../../../shared/models/task.model';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {TableService} from '../../../shared/services/table.service';

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
  userRole: string;

  @ViewChild('editTask') editTask: EditTaskComponent;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private tasksService: TasksService,
    private notification: ToastrService,
    private tableService: TableService) { }

  ngOnInit() {
    this.userRole = this.localStorageService.get('user')['type'];
    if (this.userRole !== 'admin') {
      this.router.navigate(['/system/tasks-user']);
    }
    this.tasksService.getAllTasks().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks;
    });
  }


  sortBy(by: string | any, key: string): void {
    this.sorted = this.tableService.sort(this.sorted, this.tasksList, by, key);
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
