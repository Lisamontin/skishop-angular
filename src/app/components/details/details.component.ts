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

  //product Id måste komma från ett click event från products componenten

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct(this.productId) // här hämtas produkten med motsvarande url/:id 
  } 


}