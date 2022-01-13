import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authS: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authS.isUserLogined()) {
      return false;
    } else {
      return true;
    }
  }

}
