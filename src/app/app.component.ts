import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forecasting Billing';
  isLogin :boolean =  false;  
  userDisplayName:string;
  //@ViewChild ("wrapper") wrapper;
  shouldShow : boolean = true;
  constructor(private router: Router) {

  }

  ngOnInit() {
    debugger;    
    console.log(this.router.url);
    this.isLogin = localStorage.getItem('role') != undefined ? true:false;
    this.getDisplayName();
  }
  isValidUser()
  {
    return localStorage.getItem('role') != undefined ? true:false;
  }
togglemenu(e)
{
  e.preventDefault();
  this.shouldShow = !this.shouldShow
} 
  getDisplayName() {
    this.userDisplayName =  localStorage.getItem('userDisplayName');
    console.log(this.userDisplayName);
    return localStorage.getItem('role');
  }

  onLogout() {
    localStorage.clear();
    this.isLogin = false;    
    this.router.navigate(['/login']);
    //this.router.navigateByUrl("/");
  }
}
