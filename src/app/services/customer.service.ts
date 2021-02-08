import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import ICustomer from '../models/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers = new Subject<ICustomer[]>();
  $custormers = this.customers.asObservable();

  SERVER_URL = environment.SERVER_URL;

  constructor(private http : HttpClient) { }

  getAllCustomers() {
    let customersObserver = {
      next: (customers) => {this.customers.next(customers);}
    }
    this.http.get(`${this.SERVER_URL}/Customers`).subscribe(customersObserver);
  }

  getCustomer(id: number) {
    return this.http.get<ICustomer>(`${this.SERVER_URL}/Customers/${id}`)
  }

}
