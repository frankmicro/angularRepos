import { Component, OnDestroy, OnInit } from '@angular/core';
import { Globals } from '../globals'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; //to unlock it
import { Observer } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberonSubscription: Subscription;
  custonSubscription: Subscription;
  id:number;
  status:boolean = false;

  constructor(
    private globals: Globals,
    private test: TestService
  ) { }

  ngOnInit() {
     this.id = 1;
    /*
    const myNumber = Observable.interval(1000)
    this.numberonSubscription = myNumber.subscribe(
      (number:number) => {
        console.log(number)
      }
    )

    const myObservable = Observable.create((observer: Observer<string>) => {
        setTimeout(() => {
            observer.next('package')
        }, 2000);
        setTimeout(() => {
          observer.error('this does not work')
        }, 3000);
    })
    this.custonSubscription = myObservable.subscribe(
      (data:string) => {console.log(data)},
      (error:string) => {console.log(error)},
      () => {console.log('completed')}
    )

    let data = this.globals.userDetails;
    Object.keys(data).forEach(function (key, val) {
      console.log(data[key].user);
    }); */

    this.test.userActivated.subscribe((id: number) => {
      if (id === 2) {
        this.status = false;
      }
    })
  }

  onActive() { 
    //call subject service to set data
    this.test.userActivated.next(this.id);
    this.status = true;
  }

  ngOnDestroy() {
    //this.numberonSubscription.unsubscribe();
    //this.custonSubscription.unsubscribe();
  }

}
