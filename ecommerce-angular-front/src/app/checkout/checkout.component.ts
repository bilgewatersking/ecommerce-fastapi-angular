import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
  
})
export class CheckoutComponent implements OnInit {
  stripe: Stripe;
  checkoutForm: FormGroup;

  totalPrice = 0;
  totalQuantity = 0;
  targetList: any[] = [];

  constructor(private formBuilder: FormBuilder, private CartService: CartService) {
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
    this.totalPrice = this.CartService.checkOutPrice;
    this.totalQuantity = this.CartService.checkOutQuantity;
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
    console.log(this.CartService.getCartItems())
    console.log(this.checkoutForm.get('customer').value);
  }
  async loadStripe() {
    const stripe = await loadStripe('pk_test_51OT6SiGeF8mfOk0r8bSU7nsxvfCIVIyRXA7YaQNQWrvXZ8XzntBOqZuPHA3tWuKbpVHKwwTAHNihb0a9hcLbcSTQ003uEz4Qh6');
    this.stripe = stripe;
  }

  async initiatePayment() {
    var cartItems = this.CartService.getCartItems() 
    for (const obj of cartItems) {
      // Create a new object with only name and price
      const newObj = { price: obj.id, quantity: obj.quantity };
      // Add the new object to targetList
      this.targetList.push(newObj);
    }
    const { error } = await this.stripe.redirectToCheckout({
      lineItems: 
      this.targetList,
      mode: 'payment',
      successUrl: 'https://yourwebsite.com/success',
      cancelUrl: 'https://yourwebsite.com/cancel',
    });

    if (error) {
      console.error(error);
    }
  }
}
