import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ICartItem from 'src/app/models/ICartItem';
import ICustomer from 'src/app/models/ICustomer';
import IOrder from 'src/app/models/IOrder';
import IProductOrder from 'src/app/models/IProductOrder';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  
  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private cartService: CartService,
    private customerService: CustomerService,
    private router: Router,
    public fb: FormBuilder
    
    ) {
      this.items = cartService.getItems();
      console.log(this.items, 'logged from checkout (items)')
      this.form = this.fb.group({
        firstName: '',
        lastName: '',
        phoneNumber: 0,
        email: '',
        address: ''
      });
    }
    
    items: ICartItem[] = [];
    totalprice: number;
    productOrders: IProductOrder[] = [];
    form: FormGroup;
    order: IOrder;
    customers: ICustomer[] = [];
    customer: ICustomer;
    customerId: number;
    orderToPost: IOrder;
    SERVER_URL = environment.SERVER_URL; 
     
  ngOnInit(): void { 
    this.customerService.$customers.subscribe((customers) => { this.customers = customers}); //needs to be called in sendOrder but wont run....
    this.customerService.getAllCustomers();
    this.calculateTotalPrice();
  }
  
  //submit customer information
  onSubmit(): void {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
      
    this.http.post(`${this.SERVER_URL}/Customers`, this.form.value, httpOptions).subscribe(  // move to customerService
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
      
  sendOrder() {     

    for (let i = 0; i < this.items.length; i++) {
      const productId = this.items[i].product.id;
      const quantity = this.items[i].amount;
      const totalPrice = this.totalprice;
      
      this.productOrders.push({ productId, quantity, totalPrice }); 
      console.log("productOrder:", this.productOrders)
    }; 
    
    let reversedCustomers: ICustomer[] = this.customers.reverse(); //To find id of last customer in arr
      console.log(reversedCustomers[0].id, 'reversed customers');  
      console.log(this.customers.length, 'customerlength logged in onSubmit() after form post, before ordertopost()')
    
      //const with final order to be sent
    const orderToPost: IOrder = {  
      customerId: reversedCustomers[0].id, //
      paymentMethod: 'AmEx',
      productOrders: this.productOrders, //orderRow  
    }
      // console.log("final order: ", orderToPost)
      this.orderService.postOrder(orderToPost);
      this.items = this.cartService.clearCart();
      // console.log('order submitted');
      this.form.reset();
      
      this.router.navigate(['/confirmation']);
  }
  
  calculateTotalPrice() {
    this.totalprice = 0;
    for (let i = 0; i < this.items.length; i++) {
      this.totalprice += this.items[i].amount * this.items[i].product.price;
    }
  }

}
