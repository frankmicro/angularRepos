import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public onClose: Subject<any>;
  subscription: Subscription;
  name : any;
  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
    console.log(this.name);
    
  }

  submit = () => {
    const event = {
      'data' : true
    }
    this.onClose.next(event);
    this.bsModalRef.hide();
  }

  submitForm() {
    console.log('submitted!');
    
  }

}
