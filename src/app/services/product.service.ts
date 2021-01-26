import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import IProduct from 'src/app/models/IProduct'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = new Subject<IProduct[]>();
  $products = this.products.asObservable();
  
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }
  
  getAllProducts(){
    let myObserver = {
      next: (products) => {this.products.next(products);}
    }
    this.http.get(this.SERVER_URL+'/products').subscribe(myObserver);
    console.log(this.products)
  }
}
