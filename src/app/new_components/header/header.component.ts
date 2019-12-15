import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userActivated1 = false;
  id:number = 2;

  constructor(
    private test: TestService
  ) { }

  ngOnInit() {
    //get data from action
    this.test.userActivated.subscribe((id:number) => {
      if (id === 1) {
        this.userActivated1 = true;
      }
    })
  }

  testing() {
    this.test.userActivated.next(this.id);
  }

}
