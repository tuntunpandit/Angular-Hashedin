import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen: boolean = false;
  constructor(
    private _authS: AuthService
  ) { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout() {
    this._authS.logout();
  }

}
