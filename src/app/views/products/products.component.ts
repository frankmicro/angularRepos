import { Component, OnInit } from '@angular/core';
import {NodeServiceService} from '../../modules/services/node-service.service'
import { InventoryService } from '../../modules/services/inventory.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  inventory : any = [];
  constructor(
    private _componentInteract : NodeServiceService,
    private _inventoryService : InventoryService
  ) { }

  ngOnInit(): void {
    this.inventory = this._inventoryService.getAllInventory();
  }

  addToCart(id, quantity) {
    this._inventoryService.addToCart(id, quantity);
  }
}
