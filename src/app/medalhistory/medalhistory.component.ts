import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Globals } from '../helpers/globals';

@Component({
  selector: 'app-medalhistory',
  templateUrl: './medalhistory.component.html',
  styleUrls: ['./medalhistory.component.css']
})
export class MedalhistoryComponent implements OnInit {
  userId:null;
  data:{};

  constructor(
    private apiService: ApiService,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.LoaderGlobal = true;
    this.apiService.getMedalHistory().subscribe((res) => {
      this.data = res.data;
      this.globals.LoaderGlobal = false;
    })
  }

}
