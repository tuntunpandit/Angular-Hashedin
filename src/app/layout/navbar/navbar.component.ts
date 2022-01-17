import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen: boolean = false;
  cartLength: number;
  constructor(
    private _authS: AuthService,
    private mainS: MainService
  ) { }

  ngOnInit(): void {
    // this.mainS.getAllCartItems().subscribe(data => {
    //   this.cartLength  = data.length;
    // });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout() {
    this._authS.logout();
  }

}
