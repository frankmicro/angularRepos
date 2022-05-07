import { Component, OnInit } from '@angular/core';
import {NodeServiceService} from '../../services/node-service.service'
import { InventoryService } from '../../services/inventory.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  inventory : any = [];
  constructor(
    private _componentInteract : NodeServiceService,
    private _inventoryService : InventoryService
  ) {
  }

  ngOnInit(): void {
    this.inventory = this._inventoryService.getActiveInventory();
  }

  addToCart(id, quantity) {
    this._inventoryService.addToCart(id, quantity);
  }

  changeEmitter() {
    this._componentInteract.changeEmitted$.subscribe((event) => {
      console.log(event);

    });
  }

}
