import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: (arg0: any) => any;

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  @ViewChild('dataTable', null) table: ElementRef;
  private baseUrl: string = 'http://localhost:8000/api';
  dataTable: any;
  dtOption: any;

  constructor() { }

  ngOnInit() {
    this.dtOption = {
      "ajax" : {
        "processing": true,
        "serverSide": true,
        url: this.baseUrl + '/userData',
        type : "POST",
        data: { 'id': 1, 'name': 'sathish' }

      },
      columns:[
        {
          title: 'Short Name',
          data: 'short_name'
        }
      ]
    }
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable(this.dtOption);
  }

}
