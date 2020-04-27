import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInfo } from '../../model/LoginInfo';
import { Router } from '@angular/router';
import {Config} from '../../common/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private _config: Config) { }

  register() {

  }

  login(data) {
    debugger;
    let userId = data.userId == undefined ? "":data.userId;
    let password = data.password  == undefined ? "" :data.password;
    let url = this._config.authentication + "/authenticate?userId="+userId + "&password=" + password;
    console.log(url);
    return this.http.get<LoginInfo>(url);    
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
