import {Component, OnInit} from '@angular/core';

import {ToastrService} from 'ngx-toastr';

import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../../shared/models/user.model';
import {TasksService} from '../../../shared/services/tasks.service';
import {Task} from '../../../shared/models/task.model';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {Router} from '@angular/router';
import {TableService} from '../../../shared/services/table.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  private sorted = false;
  admin: object;
  userList: object[];
  userTaskList: any;
  taskList: object[];
  searchValue = '';
  searchPlaceholder = 'First Name';
  searchField = 'firstName';
  userRole: string;



  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private usersService: UsersService,
    private tasksService: TasksService,
    private tableService: TableService,
    private notification: ToastrService) { }

  ngOnInit() {
    this.userRole = this.localStorageService.get('user')['type'];
    if (this.userRole !== 'admin') {
      this.router.navigate(['/system/tasks-user']);
    }
    this.usersService.getAllUsers('users').subscribe((users: Array<User>) => {
      this.userList = users;
    });
    this.usersService.getUserByEmail('k@g.com').subscribe((user: User) => {
      this.admin = user;
    });
    this.tasksService.getAllTasks().subscribe((tasks: Array<Task>) => {
      this.taskList = tasks;
    });
  }

  sortBy(by: string | any, key: string): void {
    this.sorted = this.tableService.sort(this.sorted, this.userList, by, key);
  }

  getTasksCount(email) {
    if (!!this.taskList) {
      this.userTaskList = this.taskList.filter((task: Task) => {
        if (task['user']['email'] === email) {
          return task;
        }
      });
      return this.userTaskList.length;
    }
  }
  remove(user: User) {
    const userIndex = this.userList.findIndex((item: User) => item.id === user.id);

    this.userTaskList = this.taskList.filter((task: Task) => {
      if (task['user']['id'] === this.userList[userIndex]['id']) {
        return task;
      }
    });

    if (this.userTaskList.length > 0) {
      for (const t in this.userTaskList) {
        const task = this.userTaskList[t];
        task['user'] = this.admin;
        this.tasksService.updateTask(task).subscribe();
      }
    }
    this.usersService.deleteUser(user).subscribe((data) => {
      this.searchValue = '';
      this.userList.splice(userIndex, 1);
      this.notification.info('User deleted!');
      this.notification.warning(
          'All tasks of deleted user was assigned to admin ' + this.admin['firstName'] + ' ' + this.admin['lastName']
      );
    });
  }

  changeCriteria(field: string) {
    const namesMap = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      tasks: 'Tasks'
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
