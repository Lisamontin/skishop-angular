import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IProduct from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  
  products: IProduct[] = []; 
  
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.$products.subscribe((products) => { this.products = products; console.log(products); });
    this.productService.getAllProducts();
  };

  
}
