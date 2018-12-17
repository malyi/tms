import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Task} from '../models/task.model';
import {BaseApi} from '../core/base-api';

@Injectable()
export class TasksService extends BaseApi {
  constructor(
    public http: HttpClient) {
    super(http);
  }

  getTaskByUserId(userId: number): Observable<Task> {
    return this.get(`tasks?user=${userId}`);
  }

  // @ts-ignore
  getAllTasks(): Observable<Array> {
    return this.get('tasks');
  }

  createNewTask(task: Task): Observable<Task> {
    return this.post('tasks', task);
  }

  updateTask(task: Task): Observable<Task> {
    console.log(task);
    return this.put(`tasks/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.delete(`tasks/${task.id}`);
  }
}
