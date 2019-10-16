import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:string = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private AuthService: AuthService,
  ) { }

  //private userData = JSON.parse(localStorage.getItem('user'));
  private userData = this.AuthService.decrypt();


  public getDashboard(): Observable<any>{
    let userId = this.userData.id;
    return this.http.get(this.baseUrl + '/getUserDetails/'+userId).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  }

  /**
   * getAssessments
   */
  public getAssessments(): Observable<any> {
    return this.http.get(this.baseUrl + '/assessment/' + this.userData.id).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  }

  public getMedalHistory(): Observable<any> {
    let userId = this.userData.id;
    return this.http.get(this.baseUrl + '/medalhistory/' + userId).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  }
  

  public dailyBlog(): Observable<any> {
    let userId = this.userData.id;
    return this.http.get(this.baseUrl + '/dashboard/blogs/' + userId).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  }

  public getChartData(): Observable<any> {
    let payload = {
      userId: this.userData.id,
      api:1
    };
    return this.http.post(this.baseUrl + '/dashboard/chartData', payload).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  }

  /**
   * getAssessmentFormData
   */
  public getAssessmentFormData(stageId: number, flag: number): Observable<any> {
    let payload = {
      userId: this.userData.id,
      stageId: stageId,
      flag: flag
    };
    return this.http.post(this.baseUrl + '/assessmentdata', payload).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  } 

  public changePassword(payload:Object): Observable<any> {
    return this.http.post(this.baseUrl + '/changepassword', payload).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  }

  public getChallengeFileds(): Observable<any> {
    let userId = this.userData.id;
    return this.http.get(this.baseUrl + '/getdailychallengefields/' + userId).pipe(
      tap((res) => res),
      catchError((err) => {
        return err;
      })
    );
  }

  public setInstructions(): Observable<any> {
    let payload = {
      userId: this.userData.id,
    };
    return this.http.post(this.baseUrl + '/instructions/accept', payload).pipe(
      tap((res) => res['response']),
      catchError((err) => {
        return err;
      })
    );
  }

  public savedailyChallenge(formValues: Object,notificationId:number): Observable<any>{

        let apiObj= {
        "api":true,
        "notification_id" : notificationId,
        "user_id" : this.userData.id,
     }
    var obj = Object.assign(formValues, apiObj);
    return this.http.post(this.baseUrl + '/dailyassessment/save',obj).pipe(
      tap((res) => res),
      catchError((err) => {
        return err;
      })
    );
  }

  /**
   * saveAssessment
   */
  public saveAssessment(payload: Object): Observable<any> {
    return this.http.post(this.baseUrl + '/assessment/save', payload)
      .pipe(
        tap((res) => res),
        catchError((err) => {
          return err;
        })
      );
  }

  public getNotifications(): Observable<any>{
    return this.http.get(this.baseUrl + '/getNotifications/'+this.userData.id).pipe(
      tap((res) => res),
      catchError((err) => {
        return err;
      })
    );
  }

  public takeNotificationAction(notificationId: string,action: string) : Observable<any>{
        let payload = {
              userId: this.userData.id,
              notificationId: notificationId,
              action: action,
          };

        return this.http.post(this.baseUrl + '/notification/take_action',payload).pipe(
          tap((res) => res),
            catchError((err) => {
            return err;
          })
        );
  }

  /**
   * saveAvatar
   */
  public saveAvatar(payload: Object): Observable<any> {
    return this.http.post(this.baseUrl + '/avatar/create', payload)
      .pipe(
        tap((res) => res),
        catchError((err) => {
          return err;
        })
      );
  }

  public updateUserFlag(): Observable<any> {
    let payload = {
      userId: this.userData.id,
      api: 1
    };
    return this.http.post(this.baseUrl + '/avatar/save', payload)
      .pipe(
        tap((res) => res),
        catchError((err) => {
          return err;
        })
      );
  }

  /**
   * getPreviewImage
   */
  public getPreviewImage() {
    let payload = {
      userId: this.userData.id,
      api: 1
    };
    return this.http.post(this.baseUrl + '/avatar', payload)
      .pipe(
        tap((res) => res),
        catchError((err) => {
          return err;
        })
      );
  }

  //save user profile info
  public saveProfileInfo(profileData: Object): Observable<any>{
      let apiObj= {
      "api":true,
      "user_id" : this.userData.id,
      }
      var obj = Object.assign(profileData, apiObj);
      return this.http.post(this.baseUrl + '/user/saveDetails',obj).pipe(
        tap((res) => res),
        catchError((err) => {
        return err;
        })
      );
  }

  //get user profile Data From Server
  public getProfileData(): Observable<any>{
      return this.http.get(this.baseUrl + '/getProfileData/'+this.userData.id).pipe(
        tap((res) => res),
        catchError((err) => {
        return err;
        })
      );
  }


}
