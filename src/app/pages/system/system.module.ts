import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';

import {TasksAdminComponent} from './tasks-admin/tasks-admin.component';
import {TasksUserComponent} from './tasks-user/tasks-user.component';
import {SystemComponent} from './system.component';
import {SharedModule} from '../../shared/shared.module';
import {
  BadgeModule, DropdownModule,
  ModalModule,
  PopoverModule, TableModule,
  TooltipModule
} from 'angular-bootstrap-md';
import {TasksService} from '../../shared/services/tasks.service';
import {AddTaskComponent} from './tasks-admin/add-task/add-task.component';
import { EditTaskComponent } from './tasks-admin/edit-task/edit-task.component';
import {FilterPipe} from '../../shared/pipes/filter.pipe';
import {UsersListComponent} from './users-list/users-list.component';
import {ViewTaskComponent} from './tasks-user/view-task/view-task.component';


@NgModule({
  declarations: [
    SystemComponent,
    TasksAdminComponent,
    TasksUserComponent,
    UsersListComponent,
    AddTaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    TooltipModule,
    PopoverModule,
    BadgeModule,
    DropdownModule,
    TableModule,
    ModalModule.forRoot(),
  ]
})

export class SystemModule {
}
