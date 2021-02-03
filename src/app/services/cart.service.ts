import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ICartItem from '../models/ICartItem';
import IProduct from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ICartItem[] = [];
  private cart = new Subject<ICartItem[]>();
  $cart = this.cart.asObservable();

  addToCart(product: IProduct) {
    this.cartItems.push({product, amount: 1});
    this.cart.next(this.cartItems);
  }

  getItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
  constructor() { }
}
