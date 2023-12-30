import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../products/product.service';
import { Router } from '@angular/router';
// import * as alertify from 'alertifyjs';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hasSubmitted: boolean;

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }

  constructor(private fb: FormBuilder, private authService: ProductService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void { }
  onSubmit() {
    this.hasSubmitted = true;
    //console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value.username, this.registerForm.value.password).subscribe(
      response => {
        //window.location.href = 'http://localhost:4200/login';
        alert("Successfully Registered. Login.")
         this.router.navigate(['/login'])
        
      },
      error => {
        alert("Username already exists!")
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