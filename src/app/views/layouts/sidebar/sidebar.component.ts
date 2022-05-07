import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NodeServiceService} from '../../../modules/services/node-service.service'
import { InventoryService } from 'src/app/modules/services/inventory.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() componentChanged: EventEmitter<boolean> =   new EventEmitter();
  shoppingCart : any = [];
  subTotal : any = 0;
  constructor(
    private _componentInteract : NodeServiceService,
    private _inventoryService : InventoryService
  ) {

   }

  ngOnInit(): void {
    this.changeEmitter();
    this.getCartItems();
  }

  getCartItems() {
    let event  = this._inventoryService.getCartItems();
    this.shoppingCart = event.cart;
    this.subTotal = event.subTotal;
  }

  changeEmitter() {
    this._componentInteract.changeEmitted$.subscribe((event) => {
      switch (event.type) {
        case "HANDLE_CART":
          this.shoppingCart = event.cart;
          this.subTotal = event.subTotal;
          break;
        default:
          break;
      }
    });
  }

  removeItem = (id : number) => {
    this._inventoryService.removeItem(id);
  }

  cancelEvent() {
    this.componentChanged.emit(false);
  }

}
