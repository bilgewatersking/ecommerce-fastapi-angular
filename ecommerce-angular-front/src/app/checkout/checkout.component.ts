import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Order } from '../products/models/order.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']

})
export class CheckoutComponent implements OnInit {
  stripe: Stripe;
  checkoutForm: FormGroup;
  purchaseSuccess: EventEmitter<any> = new EventEmitter();
  totalPrice = 0;
  totalQuantity = 0;
  targetList: any[] = [];
  orderModel = new Order();

  constructor(private formBuilder: FormBuilder, private cartService: CartService) {
    this.loadStripe();
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      // billingAddress: this.formBuilder.group({
      //   street: [''],
      //   city: [''],
      //   state: [''],
      //   country: [''],
      //   zipCode: ['']
      // }),
      // creditCard: this.formBuilder.group({
      //   cardType: [''],
      //   cardHolder: [''],
      //   cardNumber: [''],
      //   expirationMonth: [''],
      //   expirationYear: [''],
      //   securityCode: ['']
      // })
    });
    this.totalPrice = this.cartService.checkOutPrice;
    this.totalQuantity = this.cartService.checkOutQuantity;
  }

  copyShippingToBilling = (event): void => {
    if (event.target.checked) {
      this.checkoutForm.controls.billingAddress.setValue(
        this.checkoutForm.controls.shippingAddress.value
      );
    } else {
      this.checkoutForm.controls.billingAddress.reset();
    }
  }

  onSubmit = (): void => {
    console.log(this.cartService.getCartItems())
    console.log(this.checkoutForm.get('customer').value);
  }
  async loadStripe() {
    const stripe = await loadStripe('pk_test_51OT6SiGeF8mfOk0r8bSU7nsxvfCIVIyRXA7YaQNQWrvXZ8XzntBOqZuPHA3tWuKbpVHKwwTAHNihb0a9hcLbcSTQ003uEz4Qh6');
    this.stripe = stripe;
  }

  async initiatePayment() {
    var cartItems = this.cartService.getCartItems()
    for (const obj of cartItems) {
      // Create a new object with only name and price
      const newObj = { price: obj.id, quantity: obj.quantity };
      // Add the new object to targetList
      this.targetList.push(newObj);
    }
    // const { error } = await this.stripe.redirectToCheckout({
    //   lineItems: 
    //   this.targetList,
    //   mode: 'payment',
    //   successUrl: 'http://localhost:4200',
    //   cancelUrl: 'http://localhost:4200/checkout',
    // });

    // if (error) {
    //   console.error(error);
    // }
    this.orderModel.totalPrice = this.cartService.checkOutPrice;
    this.orderModel.orderItem = this.targetList;
    console.log(this.orderModel);
    this.cartService.checkout(this.orderModel).subscribe(
      response => {
        this.stripe.redirectToCheckout({
          lineItems: this.targetList,
          mode: 'payment',
          successUrl: 'http://localhost:4200/order-success',
          cancelUrl: 'http://localhost:4200/',
        });

      },
      error => {
        alert("An error occured. Please contact support!")
      }
    );

  }
  handlePurchaseSuccess() {
    debugger;
    console.log("Purchase handled")
    //this.purchaseSuccess.emit();

  }

  testfunction() {
    var cartItems = this.cartService.getCartItems()
    for (const obj of cartItems) {
      // Create a new object with only name and price
      const newObj = { price: obj.id, quantity: obj.quantity };
      // Add the new object to targetList
      this.targetList.push(newObj);
    }

    return new Promise<void>((resolve, reject) => {
      this.stripe.redirectToCheckout({
        lineItems: this.targetList,
        mode: 'payment',
        successUrl: 'http://localhost:4200/order-success',
        cancelUrl: 'http://localhost:4200/',
      })
        .then((result) => {
          resolve(); // Resolve the promise when the redirect is complete
        })
        .catch((error) => {
          reject(error); // Reject the promise if there is an error during the redirect
        });
    })
      .then(() => {
        this.handlePurchaseSuccess(); // Call the handlePurchaseSuccess method after the successful redirect
      })
      .catch((error) => {
        // Handle any errors that might occur during the redirect
      });
  }
}
