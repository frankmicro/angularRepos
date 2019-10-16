import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../../helpers/globals';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() isObstetricStepVisible: boolean;

  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {
  }

}
