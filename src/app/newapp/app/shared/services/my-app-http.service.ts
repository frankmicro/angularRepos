import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import {EncrDecrService} from '../services/encr-decr.service';

@Injectable({
  providedIn: 'root'
})
export class MyAppHttpService {
  BaseAppUrl = environment.URL;
  
  constructor(
    private http: HttpClient,
    private EncrDecr: EncrDecrService
  ) { 
    
  }

  /**
   * @params serviceName indicates service endpoint;
   * @params postBody indicates paramss to post
   * @params options indicates option to pass like headers and etc.
   */
  post(serviceName, postBody: any, options?: any) {
    let url = this.BaseAppUrl + serviceName;
    if (options) {
      return this.http.post(url, postBody, options)
        .pipe(map(res => {
          return this.handleResponse(res);
        }))
    } else {
      return this.http.post(url, postBody)
        .pipe(map(res => {
          return this.handleResponse(res);
        }))
    }
  }

  /**
   * @params serviceName indicates service endpoint;
   */
  get(serviceName) {
    let url = this.BaseAppUrl + serviceName;

    return this.http.get(url).pipe(map(res => {
      return this.handleResponse(res);
    }))
  }

  /**
   * @params res data to check error and pass refresh token;
   */
  handleResponse(res) {
    if (res.success) {
      if (res.hasOwnProperty('data')) {
        
        if (res.data != null && res.data.hasOwnProperty('user')) {
          if (res.data.user['token']) {
            localStorage.setItem('ACCESS_TOKEN',this.EncrDecr.set(res.data.user['token']));
          }
        }
      }
    }
    return res;
  }

}
