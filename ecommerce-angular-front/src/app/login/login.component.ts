import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../products/product.service';
import { Router } from '@angular/router';
// import * as alertify from 'alertifyjs';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasSubmitted: boolean;

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private fb: FormBuilder, private authService: ProductService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void { }
  onSubmit() {
    this.hasSubmitted = true;
    //console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      response => {
        console.log(response)
        localStorage.setItem('username',this.loginForm.value.username);
        window.location.href = 'http://localhost:4200/products';
        // this.router.navigate(['/products'])
      },
      error => {
        alert("Invalid login credentials!")
      }
    );
    // 
    // this.loginForm.reset();
    // if (this.loginForm.valid) {
    //   if(token){ //if user have some value it will check and validate
    //     alertify.success('You have logged in successfully');
    //     this.router.navigate(['/special']);
    //   }
    //   else{ //if user is null or incorrect
    //     alertify.error('Username or Password is wrong');
    //   }

    //   this.loginForm.reset();
    //   this.hasSubmitted = false;
    // }
    // else{
    //   alertify.error('Kindly fill required fields');
    // }

  }
}