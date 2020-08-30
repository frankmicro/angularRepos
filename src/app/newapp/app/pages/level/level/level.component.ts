import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  @ViewChild('name', {static:false}) name:ElementRef;

  constructor() { }

  ngOnInit() {
    
  }

}
