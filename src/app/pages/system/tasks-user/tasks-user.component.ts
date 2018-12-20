import {Component, OnInit, ViewChild} from '@angular/core';
import {EditTaskComponent} from '../tasks-admin/edit-task/edit-task.component';
import {TasksService} from '../../../shared/services/tasks.service';
import {ToastrService} from 'ngx-toastr';
import {Task} from '../../../shared/models/task.model';
import {TableService} from '../../../shared/services/table.service';

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


  @ViewChild('editTask') editTask: EditTaskComponent;

  constructor(
      private tasksService: TasksService,
      private tableService: TableService,
      private notification: ToastrService) { }

  ngOnInit() {
    this.tasksService.getAllTasks().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks;
    });
  }

  sortBy(by: string | any, key: string): void {
    this.sorted = this.tableService.sort(this.sorted, this.tasksList, by, key);
  }

  editedTask(task: Task) {
    const taskIndex = this.tasksList.findIndex((item: Task) => item.id === task.id);
    this.tasksList[taskIndex] = task;

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
