import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment, Route } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private _authS: AuthService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this._authS.isUserLogined() ? true : this._router.createUrlTree(['/login']);
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    return this._authS.isUserLogined();
  }

}
