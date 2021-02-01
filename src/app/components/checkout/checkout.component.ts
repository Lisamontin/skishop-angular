import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import IOrder from 'src/app/models/IOrder';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items = this.cartService.getItems();

  checkoutForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    // phoneNumber: 0,
    // email: '',
    address: ''

  });

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private cartService: CartService,
    private formBuilder: FormBuilder
  
  ) { }

  onSubmit(): void {
    //process checkoutdata here
    this.items = this.cartService.clearCart();
    console.log('order submitted');
    this.checkoutForm.reset();
  }

  ngOnInit(): void {
  }

  // newOrder: IOrder = {
  //   id: 0,
  //   customerId: 0,
  //   paymentMethod: 'visa',
  //   productOrder: IProductOrder[]; //orderRow

  // }

  // this.OrderService.post(newOrder).subscribe();
}

//  gather all information to post order - customer information and orderinformation from 
//  cart via order service (or cart service..)  also - submit button sends orderinfo to admin page