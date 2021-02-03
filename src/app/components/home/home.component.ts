import { Component, OnInit } from '@angular/core';
import IProducts from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  opened = false;
  // products: IProducts[] = []; // create iproducts interface

  // constructor(private productService: ProductService) { }

  ngOnInit(): void {
    
    // this.productService.$products.subscribe((products) => { this.products = products; console.log(products); });
    // this.productService.getAllProducts();
  };
  
}


