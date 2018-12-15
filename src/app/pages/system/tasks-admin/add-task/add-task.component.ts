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
    descriptionError: 'Description can\'t be blank'
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
      taskUser: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.addTaskForm.invalid) {
      return;
    }

    const {taskTitle, taskDescription, taskUser} = this.addTaskForm.value;
    const task = new Task(taskTitle, taskDescription, taskUser);

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
