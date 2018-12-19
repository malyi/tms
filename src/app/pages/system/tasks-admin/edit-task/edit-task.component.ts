import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'angular-bootstrap-md';
import {User} from '../../../../shared/models/user.model';
import {UsersService} from '../../../../shared/services/users.service';
import {Task} from '../../../../shared/models/task.model';
import {TasksService} from '../../../../shared/services/tasks.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  editTaskForm: FormGroup;
  userList: Array<User>;
  taskId: number;

  validationMessages = {
    titleError: 'Title can\'t be blank',
    descriptionError: 'Description can\'t be blank'
  };

  @ViewChild('editTask') editTask: ModalDirective;
  @ViewChild('editTask') public contentModal;
  @Output() onTaskEdit = new EventEmitter<Task>();

  constructor(
      private fb: FormBuilder,
      private usersService: UsersService,
      private taskService: TasksService,
      private notification: ToastrService ) {
    this.editTaskForm = fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      estimationHr: [0, Validators.required],
      estimationMin: [0, Validators.required],
      trackedHr: [0, Validators.required],
      trackedMin: [0, Validators.required],
      userId: ['', Validators.required]
    });
    this.usersService.getAllUsers('full').subscribe((users: Array<User>) => {
      return this.userList = users;
    });
  }

  ngOnInit() {
  }
  public open(task) {
    this.editTaskForm.setValue({
      taskTitle: task.title,
      taskDescription: task.description,
      estimationHr: Math.trunc(task.estimation / 60),
      estimationMin: task.estimation % 60,
      trackedHr: Math.trunc(task.tracked / 60),
      trackedMin: task.tracked % 60,
      userId: task.user.id
    });
    this.editTask.show();
    this.taskId = task.id;
  }

  onSubmit() {
    if (this.editTaskForm.invalid) {
      return;
    }
    const task = this.taskService.generateTask(this.editTaskForm.value, this.userList, this.taskId);
    this.taskService.updateTask(task)
        .subscribe((respTask: Task) => {
          this.onTaskEdit.emit(respTask);
          this.contentModal.hide();
          this.notification.success('Task updated!');
        });
  }

}
