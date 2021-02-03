import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import IOrder from 'src/app/models/IOrder';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  SERVER_URL = environment.SERVER_URL;

  constructor(private orderService : OrderService, private http : HttpClient) { }

  orders: IOrder[] = [];
  

  ngOnInit(): void {
    
    this.orderService.$orders.subscribe((orders) => { this.orders = orders});
    this.orderService.getOrders();

    this.http.get(`${this.SERVER_URL}/Customers`).subscribe(
      
      (response) => console.log('Customers:', response),
      (error) => console.log(error)
    )
  }
}

