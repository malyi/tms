import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../../shared/services/users.service';
import {User} from '../../../../shared/models/user.model';
import {Task} from '../../../../shared/models/task.model';
import {TasksService} from '../../../../shared/services/tasks.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  userList: Array<User>;
  validationMessages = {
    titleError: 'Title can\'t be blank',
    descriptionError: 'Description can\'t be blank',
    userError: 'Please choose User'
  };

  @ViewChild('frame') public contentModal;
  @Output() onTaskAdd = new EventEmitter<Task>();

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private taskService: TasksService,
    private notification: ToastrService) {

    this.usersService.getUserAllUsers('short').subscribe((users: Array<User>) => {
      return this.userList = users;
    });

    this.addTaskForm = fb.group({
      taskTitle: [null, Validators.required],
      taskDescription: [null, Validators.required],
      estimationHr: [0, Validators.required],
      estimationMin: [0, Validators.required],
      trackedHr: [0, Validators.required],
      trackedMin: [0, Validators.required],
      userId: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.addTaskForm.invalid) {
      return;
    }

    const {taskTitle, taskDescription, estimationHr, estimationMin, trackedHr, trackedMin, userId} = this.addTaskForm.value;
    const userIndex = this.userList.findIndex((user: User) => user.id === userId);
    const estimation = estimationHr * 60 + estimationMin;
    const tracked = trackedHr * 60 + trackedMin;
    const progress = (tracked / estimation) * 100;
    const status = ((progress <= 0) ? 'todo' : (progress >= 100) ? 'finished' : 'in progress' );
    const task = new Task(taskTitle, taskDescription, estimation, tracked, progress, this.userList[userIndex], status);

    this.taskService.createNewTask(task)
      .subscribe((respTask: Task) => {
        this.onTaskAdd.emit(respTask);
        this.addTaskForm.reset();
        this.contentModal.hide();
        this.notification.success('Task added!');
      });
  }

  onClosed() {
    this.addTaskForm.reset();
  }

}
