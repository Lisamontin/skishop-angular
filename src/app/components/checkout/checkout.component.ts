import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ICartItem from 'src/app/models/ICartItem';
import IOrder from 'src/app/models/IOrder';
import IProductOrder from 'src/app/models/IProductOrder';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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
     

     //DECLARE VARS
     items: ICartItem[] = [];
     totalprice: number;
     productOrder: IProductOrder[] = [];
     form: FormGroup;
     SERVER_URL = environment.SERVER_URL;
      
    
    ngOnInit(): void {
      this.calculateTotalPrice();
    }

    //ON CLICK purchase button
    onSubmit(): void {
      //process checkoutdata here
      console.log(this.form.value, "form value logged from onSubmit()");

      var formData: any = new FormData();
        formData.append("firstName", this.form.get('firstName').value);
        formData.append("lastName", this.form.get('lastName').value);
        formData.append("phoneNumber", this.form.get('phoneNumber').value);
        formData.append("emamil", this.form.get('email').value);
        formData.append("address", this.form.get('address').value);

        var formDataStringed = JSON.stringify(formData);
      
        const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }

      this.http.post(`${this.SERVER_URL}/Customers`, formDataStringed, httpOptions).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )



      //to fill productOrder (order rows)
    for (let i = 0; i < this.items.length; i++) {
      const productId = this.items[i].product.id;
      const quantity = this.items[i].amount;
      const totalPrice = this.totalprice;
      const id = 0;
      const orderId = 0;

      this.productOrder.push({ id, orderId, productId, quantity, totalPrice })
      
    };  

    //const with final order to be sent
      const newOrder: IOrder = {  
        // id: 0,  
        customerId: 1, // get customerId from getCustomer()... can it be done?
        paymentMethod: 'AmEx',
        // productOrder: this.productOrder//orderRow  
    }

    this.orderService.postOrder(newOrder);


    this.items = this.cartService.clearCart();
    console.log('order submitted');
    this.form.reset();
    
    this.router.navigate(['/confirmation']);
    }

    // get info from form to post to customer table

    
  
  
  calculateTotalPrice() {
    this.totalprice = 0;
    for (let i = 0; i < this.items.length; i++) {
      this.totalprice += this.items[i].amount * this.items[i].product.price;
    }
  }

}

//  gather all information to post order - customer information and orderinformation from 
//  cart via order service (or cart service..)  