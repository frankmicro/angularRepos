import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '@shared/services/common.service';
import { Globals } from '@shared/helpers/globals';
import { MyAppHttpService } from '@shared/services/my-app-http.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserComponent as UserModal } from '@shared/modals/user/user.component';
import { User as userModel } from '../data/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  Subscription : Subscription;
  flag:boolean = false;
  bsModalRef: BsModalRef;
  textFlag : boolean = false;
  userNameBind : string = 'rohan';
  userDetails : userModel[] = [
    new userModel('Rohan','PArkar',27)
  ];
  
  constructor(
    private _commonService : CommonService,
    private _globals : Globals,
    private _httpService : MyAppHttpService,
    private _modalService: BsModalService
  ) { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000).map(
      (data : number) => {
        return data * 2;
      }
    );
    this.Subscription = myNumbers.subscribe(
      (number:number) => {
       // console.log(number);
      }
    );
    // const myObservables = Observable.create((observer : Observer <any>) => {
    //   setTimeout(() => {
    //     observer.next('first interval');
    //   }, 2000);
    // });
    // myObservables.subscribe(
    // (data : string) => {
    //   console.log(data);
      
    // },
    // (error : string) => {
    //   console.error(error);
      
    // },  
    // () => {
    //   console.log('completed');
      
    // }
    // );
    console.log(this.userDetails);
    this._commonService.subjectActivated$.subscribe((id:number) => {
      if (id === 1) {
        this.flag = true;
      }
    });

    this._commonService.changeEmitted$.subscribe((event) => {
      switch (event.type) {
        case "SUBMIT_PROFILE_FORM":
          this.popUp();
          break;
        default:
          break;
      }
    });
  }

  popUp = () => {
    alert("hello!");
    this.follow(0);
  }
  
  follow = (id:number) => { 
    this.textFlag = true;
    console.log(this._globals.Name);
    console.log(this._httpService.BaseAppUrl);
    const initialState = {
      name : 'rohan modal'
    };
    this.bsModalRef = this._modalService.show(UserModal, { class: 'modal-md', initialState });
    this.bsModalRef.content.onClose.subscribe((event: any) => {
      console.log(event);
    });
    
    this._commonService.subjectActivated$.next(id);
  }

  activateProfile = () => {
    let event = {
      type: "SUBMIT_PROFILE_FORM",
    };
    this._commonService.emitChange(event);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
