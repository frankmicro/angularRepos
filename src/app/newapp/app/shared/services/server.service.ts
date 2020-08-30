import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { 

  }

  storeServer = (servers:any[]) => {
    //uses observables behind the scenes
    const headers = new Headers({
      'Content-Type':'application/json'
    })
    return this.http.post('https://udemy-ng-http-e6ba8.firebaseio.com/data.json',servers,
    this._options);
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-e6ba8.firebaseio.com/data.json');
  }
}
