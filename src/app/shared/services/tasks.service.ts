import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Task} from '../models/task.model';
import {BaseApi} from '../core/base-api';
import {User} from '../models/user.model';

@Injectable()
export class TasksService extends BaseApi {

  constructor(
    public http: HttpClient) {
    super(http);
  }

  generateTask(formValue, userList, taskId?) {
    const {taskTitle, taskDescription, estimationHr, estimationMin, trackedHr, trackedMin, userId} = formValue;
    const userIndex = userList.findIndex((user: User) => user.id === userId);
    const estimation = estimationHr * 60 + estimationMin;
    const tracked = trackedHr * 60 + trackedMin;
    const progress = estimation ? (tracked / estimation) * 100 : 0;
    const status = ((progress <= 0) ? 'todo' : (progress >= 100) ? 'finished' : 'in progress' );
    return new Task(taskTitle, taskDescription, estimation, tracked, progress, userList[userIndex], status, taskId);
  }
  // @ts-ignore
  getAllTasks(): Observable<Array> {
    return this.get('tasks');
  }

  getTasksByUserId(userId: number): Observable<Task> {
    return this.get(`tasks?user.id_like=${userId}`);
  }

  createNewTask(task: Task): Observable<Task> {
    return this.post('tasks', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.put(`tasks/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.delete(`tasks/${task.id}`);
  }
}
