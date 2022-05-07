import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NodeServiceService} from '../../../modules/services/node-service.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() componentChanged: EventEmitter<boolean> =   new EventEmitter();
  subQuantity : number = 0;
  constructor(
    private _componentInteract : NodeServiceService,
  ) { }

  ngOnInit(): void {
    this.changeEmitter()
  }

  cancelEvent() {
    this.componentChanged.emit(true);
  }

  changeEmitter() {
    this._componentInteract.changeEmitted$.subscribe((event) => {
      switch (event.type) {
        case "HANDLE_CART":
          this.subQuantity = event.subQuantity;
          break;
        default:
          break;
      }
    });
  }

}
