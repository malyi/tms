import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {TasksAdminComponent} from './tasks-admin/tasks-admin.component';
import {UsersListComponent} from './users-list/users-list.component';
import {TasksUserComponent} from './tasks-user/tasks-user.component';
import {AuthGuard} from '../../shared/services/auth.guard';


const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'tasks', component: TasksAdminComponent},
      {path: 'users', component: UsersListComponent},
      {path: 'tasks-user', component: TasksUserComponent},
      {
        path: '**',
        redirectTo: 'tasks'
      }
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
