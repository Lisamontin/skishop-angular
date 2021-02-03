import { Component, OnInit } from '@angular/core';
import ICartItem from 'src/app/models/ICartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: ICartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.$cart.subscribe((cart) => {
      // this.cartService.getItems();
      this.cart = cart;
      console.log(cart, 'logged from cart component')
    });
  }

}
