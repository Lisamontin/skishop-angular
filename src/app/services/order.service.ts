import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import IOrder from '../models/IOrder';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  SERVER_URL = environment.SERVER_URL;
  constructor(
    private http: HttpClient, 
  ) { }

  private orders = new Subject<IOrder[]>();
  $orders = this.orders.asObservable();
  
  private order = new Subject<IOrder>();
  $order = this.order.asObservable();

  
  getOrders(){
    let myObserver = {
      next: (orders) => {this.orders.next(orders);}
    }
    this.http.get(`${this.SERVER_URL}/orders`).subscribe(myObserver);
    console.log(this.orders, "logged from order service getorders()")
  } 

 postOrder(order: IOrder) {
   let mySecondObserver = {
     next: (order) => {this.order.next(order);}
   }
   console.log("from postOrder service")
   return this.http.post(`${this.SERVER_URL}/Orders`, order).subscribe(mySecondObserver);
  }

}
