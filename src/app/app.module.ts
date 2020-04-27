import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Config } from './common/config';
import {DashboardService} from './dashboard/dashboard.service';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { LoginComponent } from './login/login.component';

import { AsideToggleDirective } from './common/directive/aside.directive';
import { NAV_DROPDOWN_DIRECTIVES} from './common/directive/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES} from './common/directive/sidebar.directive';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { DatePipe } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { ProjectallocationComponent } from './projectallocation/projectallocation.component';
import { LeaveComponent } from './leave/leave.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavMenuComponent,
    SidemenuComponent,
    LoginComponent,    
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AccessdeniedComponent,
    ProjectComponent,
    UserComponent,
    ProjectallocationComponent,
    LeaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Config,
    DashboardService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
