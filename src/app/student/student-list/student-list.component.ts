import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestService } from '../../service/test.service';
import { Globals } from '../../globals';
import { ISubscription } from "rxjs/Subscription";
declare var $: (arg0: any) => any;


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  @ViewChild('dataTable', null) table : ElementRef;
  dataTable:any;
  dtOption:any;

  private subscription: ISubscription;

  constructor(
    private globals: Globals,
    private testService: TestService,
  ) { }

  ngOnInit() {
    this.dtOption = {
      "paging": false,
      "ordering": false,
      "info": false
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable(this.dtOption);
    this.globals.role = "no test";
    this.check();
  }

  check() {
    this.testService.getFunc().subscribe((res) => {
      console.log(res);
    });
  }

}
