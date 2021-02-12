// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ICustomer from 'src/app/models/ICustomer';
import IOrder from 'src/app/models/IOrder';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  SERVER_URL = environment.SERVER_URL;

  constructor(
    private orderService : OrderService, 
    // private http : HttpClient,
    private customerService : CustomerService
    ) { }

  orders: IOrder[] = [];
  customers: ICustomer[] = [];
  

  ngOnInit(): void {
    
    this.orderService.$orders.subscribe((orders) => { this.orders = orders, console.log(orders[0].productOrders)});
    this.orderService.getOrders();

    this.customerService.$customers.subscribe((customers) => { this.customers = customers; console.log('customers.length: ', customers.length)});
    this.customerService.getAllCustomers();
    }
   
}

