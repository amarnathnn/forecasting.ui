import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../app/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { ProjectallocationComponent } from './projectallocation/projectallocation.component';
import { LeaveComponent } from './leave/leave.component';
const routes: Routes = [

  {
    path: "", component:LoginComponent,  pathMatch: "full"
  }, 
  {
    path: "login", component:LoginComponent,  pathMatch: "full"
  }, 
  {
    path: "dashboard", component: DashboardComponent, canActivate: [], canActivateChild: [], canLoad: [], canDeactivate: []
  },
  {
    path: "project", component: ProjectComponent, canActivate: [], canActivateChild: [], canLoad: [], canDeactivate: []
  },
  {
    path: "user", component: UserComponent, canActivate: [], canActivateChild: [], canLoad: [], canDeactivate: []
  },
  {
    path: "projectallocation", component: ProjectallocationComponent, canActivate: [], canActivateChild: [], canLoad: [], canDeactivate: []
  },
  {
    path: "leave", component: LeaveComponent, canActivate: [], canActivateChild: [], canLoad: [], canDeactivate: []
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
