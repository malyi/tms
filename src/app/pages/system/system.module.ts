import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';

import {TasksAdminComponent} from './tasks-admin/tasks-admin.component';
import {UsersComponent} from './users/users.component';
import {TasksUserComponent} from './tasks-user/tasks-user.component';
import {SystemComponent} from './system.component';
import {SharedModule} from '../../shared/shared.module';
import {
  BadgeModule, DropdownModule,
  ModalModule,
  PopoverModule,
  TooltipModule
} from 'angular-bootstrap-md';
import {TasksService} from '../../shared/services/tasks.service';
import {AddTaskComponent} from './tasks-admin/add-task/add-task.component';
import { EditTaskComponent } from './tasks-admin/edit-task/edit-task.component';


@NgModule({
  declarations: [
    SystemComponent,
    TasksAdminComponent,
    TasksUserComponent,
    UsersComponent,
    AddTaskComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    TooltipModule,
    PopoverModule,
    BadgeModule,
    DropdownModule,
    ModalModule.forRoot(),
  ],
  providers: [TasksService]
})

export class SystemModule {
}
