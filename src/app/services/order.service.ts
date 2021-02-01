import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private Http: HttpClient, 
    private cartService: CartService
  ) { }

  postOrder() {
    
  }
}
