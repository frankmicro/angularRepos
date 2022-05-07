import { Injectable } from '@angular/core';
import { food } from '../../food'
import { NodeServiceService } from './node-service.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventory : any = food
  cart : any = [];
  constructor(
    private _componentInteract : NodeServiceService
  ) { }

  getActiveInventory() {
    return this.inventory.filter(res => res.status == 'active')
  }

  getAllInventory() {
    return this.inventory;
  }

  addToCart(id : number, quantity : number) {
    if(!quantity) return;

    let tempCart = this.cart.filter(res =>  res.id == id)
            if (tempCart.length > 0) {
                var index = this.cart.map(x => {
                    return x.id;
                }).indexOf(id);
                this.cart.splice(index,1);
                tempCart = tempCart.map((res) => ({
                    ...res, 'total' : (res.price['USD'] * quantity + res.total),
                    'totalQuantity':res.totalQuantity + quantity
                    }))
            } else {
                tempCart = this.inventory.filter(res =>
                    res.id == id
            ).map((res) => ({
                ...res, 'total' : (res.price['USD'] * quantity),
                'totalQuantity':quantity
                }))
            }
            this.cart.push(tempCart[0]);
            tempCart = [];
            this.dispactchCart(this.cart);
  }

  dispactchCart = (cart : any) => {
    let subTotal = cart.reduce((acc, val) => {
      return acc += val.total
    },0)
    let subQuantity = cart.reduce((acc, val) => {
      return acc += val.totalQuantity
    },0)
    let event = {
    	type: "HANDLE_CART",
      cart : this.cart,
      subQuantity : subQuantity,
      subTotal : subTotal
    }
	  this._componentInteract.emitChange(event);
    this.getCartItems(subTotal);
  }

  getCartItems = (subTotal = 0)  => {
    return {
      'cart': this.cart,
      'subTotal' : subTotal
    }
  }

  removeItem = (id : number) => {
    let cartIndex = this.cart.map((res) => {
      return res.id
    }).indexOf(id);
    this.cart.splice(cartIndex, 1);
    this.dispactchCart(this.cart)
  }
}
