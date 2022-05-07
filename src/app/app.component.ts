import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  showSidebar : boolean = false;

  constructor(
  ) {
  }

  componentChangeHandler(flag: boolean) {
    this.showSidebar = flag;
  }
}
