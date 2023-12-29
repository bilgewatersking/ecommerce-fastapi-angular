import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;
  loggedInUsername: string;

  constructor() {
    this.isLoggedIn = localStorage.getItem('username') !== null;
    this.loggedInUsername= localStorage.getItem('username');
  }
  logout() {
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.loggedInUsername= '';
  }
}