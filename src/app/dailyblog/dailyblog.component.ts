import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Globals } from '../helpers/globals';

@Component({
  selector: 'app-dailyblog',
  templateUrl: './dailyblog.component.html',
  styleUrls: ['./dailyblog.component.css']
})
export class DailyblogComponent implements OnInit {
  notificationData:Object = {};

  constructor(
    private apiService:ApiService,
    private globals:Globals
  ) { }

  ngOnInit() {
    this.globals.LoaderGlobal = true;
    this.apiService.dailyBlog().subscribe((res) => {
      this.notificationData = res.data;
      this.globals.LoaderGlobal = false;
    })
  }

}
