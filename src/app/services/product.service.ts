import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
    this.http.get(`${this.SERVER_URL}/products`).subscribe(myObserver);
    console.log(this.products, "logged from product service getallproducts()")
  }

  getProduct(id: number): Observable<IProduct>{

    console.log('getproduct ran')

    return this.http.get<IProduct>(`${this.SERVER_URL}/products/${id}`);
  }
  removeProduct() {
    // let index = this.products.indexOf(product);
    // if (index !== -1) {
    //   this.products.splice(index, 1);
    // }
  }
}
