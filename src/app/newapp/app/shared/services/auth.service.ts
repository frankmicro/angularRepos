import { Injectable } from '@angular/core';
import { MyAppHttpService } from './my-app-http.service';
import { Endpoints } from '../config/app.constant';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from './encr-decr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MyAppHttpService{
  loggedIn : boolean = false;

  constructor(http: HttpClient, EncrDecr: EncrDecrService){
    super(http, EncrDecr);
  }

  login = (params: any) => {
    return this.post(Endpoints.signIn, params);
  }

  storeToken = () => {
    console.log("in");
    
  }

  isLoggedIn = () => {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  isAuthenticated = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
        reject(new Error('something went wrong'));
      },800);
    });
    return promise;
  }

  isLogin = () => {
    this.loggedIn = true;
  }

  logout = () => {
    this.loggedIn = false;
  }
}
