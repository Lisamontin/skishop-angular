import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IProduct from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productId: number;
  product: IProduct;
  products: IProduct[];


  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.$products.subscribe((products) => { this.products = products; 
      
      const routeParams = this.route.snapshot.paramMap;
      const productIdFromRoute = Number(routeParams.get('id'));
  
      this.product = products.find(product => product.id === productIdFromRoute);
      console.log(this.product)
      console.log(products); });
    this.productService.getAllProducts();
 
      
    } 


}