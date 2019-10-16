import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { User } from './user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {EncrDecrService} from './services/encr-decr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl:string = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private EncrDecr: EncrDecrService
  ) { }

  public login(email: string, password: string) : Observable<any>{
    let payload = {
      grant_type: "password",
      client_id: 2,
      client_secret: "IXpwBOCNvcTVCB7opNWSUeoOeoOaw6LQ7RV6blda",
      username: email,
      password: password,
    };
    return this.http.post(this.baseUrl + '/oauth/token', payload)
      .pipe(
        catchError((err) => {
          return err;
        })
      );
    // localStorage.setItem('ACCESS_TOKEN', "access_token");
  }

  public storeUserLogin(user) {
    localStorage.setItem('ACCESS_TOKEN',this.EncrDecr.set( user.access_token));
    localStorage.setItem('user',this.EncrDecr.set(JSON.stringify(user.user)));  
  }

  public updateUserFlags(user) {
    localStorage.setItem('user', this.EncrDecr.set(JSON.stringify(user)));  
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public isProfileData() {
    return JSON.parse(this.EncrDecr.get(localStorage.getItem('profileData')));
  }

  public isInstruction() {
    let userData = this.decrypt();
    return (userData) ? userData.is_instruction : 3;
  }

  public isAvatar() {
    let userData = this.decrypt();
    return (userData) ? userData.is_avatar : 3;
  }

  /**
   * isProfile
   */
  public isProfile() {
    let userData = this.decrypt();
    return (userData) ? userData.is_profile : 3;
  }

  public getUserId() {
    let userData = this.decrypt();
    return (userData) ? userData.id : false;
  }

  public changePassword() {
    let userData = this.decrypt();
    return (userData) ? userData.flag : 3;
  }

  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('user');
    localStorage.removeItem('profileData');
    this.router.navigateByUrl('/login');
  }

  public decrypt(){
    return JSON.parse(this.EncrDecr.get(localStorage.getItem('user')));
  }


  public forgotPassword(email: string) : Observable<any>{
    let payload = {
      email:email,
      "api":"true"
    };
    return this.http.post(this.baseUrl + '/forgot_password', payload)
      .pipe(
        catchError((err) => {
          return err;
        })
      );
  }

  public userDetails() {
    let userData = this.decrypt();
    return userData;
  }

}