import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';

import {TasksAdminComponent} from './tasks-admin/tasks-admin.component';
import {UsersComponent} from './users/users.component';
import {TasksUserComponent} from './tasks-user/tasks-user.component';
import {SystemComponent} from './system.component';
import {SharedModule} from '../../shared/shared.module';
import {
  ModalModule,
  PopoverModule,
  TooltipModule
} from 'angular-bootstrap-md';
import {TasksService} from '../../shared/services/tasks.service';
import {AddTaskComponent} from './tasks-admin/add-task/add-task.component';


@NgModule({
  declarations: [
    SystemComponent,
    TasksAdminComponent,
    TasksUserComponent,
    UsersComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    TooltipModule,
    PopoverModule,
    ModalModule.forRoot(),
  ],
  providers: [TasksService]
})

export class SystemModule {
}
