import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomepageComponent} from './pages/homepage/homepage.component';
import {SystemComponent} from './pages/system/system.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'system',
    loadChildren: './pages/system/system.module#SystemModule'
  },
  {
    path: 'account',
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
  // {
  //   path: 'dashboard',
  //   loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
