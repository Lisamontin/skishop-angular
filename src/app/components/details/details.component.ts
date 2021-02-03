import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IProduct from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
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


  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    
    this.productService.$products.subscribe((products) => { this.products = products; 
      
      const routeParams = this.route.snapshot.paramMap;
      const productIdFromRoute = Number(routeParams.get('id'));
      
      this.product = products.find(product => product.id === productIdFromRoute);
      console.log(this.product)
      console.log(products); });
      this.productService.getAllProducts();

      //////////test/////////

    
      // this.productService.getProduct(this.product.id);
      
      //////////////////////
      
    }
    
    addToCart(product: IProduct) {
      this.cartService.addToCart(product);
      console.log('added product to cart')
      // window.alert('Your product has been added to the cart!');
      
    }


}