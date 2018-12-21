import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'angular-bootstrap-md';
import {User} from '../../../../shared/models/user.model';
import {UsersService} from '../../../../shared/services/users.service';
import {Task} from '../../../../shared/models/task.model';
import {TasksService} from '../../../../shared/services/tasks.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  viewTaskForm: FormGroup;
  userList: Array<User>;
  taskId: number;
  task: Task;

  validationMessages = {
    titleError: 'Title can\'t be blank',
    descriptionError: 'Description can\'t be blank'
  };

  @ViewChild('viewTask') viewTask: ModalDirective;
  @ViewChild('viewTask') public contentModal;
  @Output() onTaskView = new EventEmitter<Task>();

  constructor(
      private fb: FormBuilder,
      private usersService: UsersService,
      private taskService: TasksService,
      private notification: ToastrService ) {
    this.viewTaskForm = fb.group({
      taskTitle: [{value: '', disabled: true}, Validators.required,],
      taskDescription: [{value: '', disabled: true}, Validators.required],
      estimationHr: [{value: 0, disabled: true}, Validators.required],
      estimationMin: [{value: 0, disabled: true}, Validators.required],
      trackedHr: [0, Validators.required],
      trackedMin: [0, Validators.required],
      userId: [{value: '', disabled: true}, Validators.required]
    });
    this.usersService.getAllUsers('full').subscribe((users: Array<User>) => {
      return this.userList = users;
    });
  }

  ngOnInit() {
  }
  public open(task) {
    this.viewTaskForm.setValue({
      taskTitle: task.title,
      taskDescription: task.description,
      estimationHr: Math.trunc(task.estimation / 60),
      estimationMin: task.estimation % 60,
      trackedHr: Math.trunc(task.tracked / 60),
      trackedMin: task.tracked % 60,
      userId: task.user.id
    });
    this.viewTask.show();
    this.taskId = task.id;
    this.task = task;
  }

  onSubmit() {
    if (this.viewTaskForm.invalid) {
      return;
    }
    const task = this.task;
    const trackedHr = this.viewTaskForm.get('trackedHr').value;
    const trackedMin = this.viewTaskForm.get('trackedMin').value;
    const tracked = trackedHr * 60 + trackedMin;
    const estimation = task.estimation;
    const progress = estimation ? (tracked / estimation) * 100 : 0;

    task['trackedHr'] = trackedHr;
    task['trackedMin'] = trackedMin;
    task['tracked'] = tracked;
    task['progress'] = progress;

    this.taskService.updateTask(task)
    .subscribe((respTask: Task) => {
      this.onTaskView.emit(respTask);
      this.contentModal.hide();
      this.notification.success('Task updated!');
    });
  }

}
