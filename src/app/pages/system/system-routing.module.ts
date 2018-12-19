import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {TasksAdminComponent} from './tasks-admin/tasks-admin.component';
import {UsersComponent} from './users/users.component';
import {UsersListComponent} from './users-list/users-list.component';


const routes: Routes = [
  {path: '', component: SystemComponent, children: [
      {path: 'tasks', component: TasksAdminComponent},
      {path: 'users', component: UsersListComponent},
      {path: 'users', component: UsersListComponent},
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
