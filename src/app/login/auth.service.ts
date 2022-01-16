import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";
// user class
export class User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private _router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isUserLogined() {
    return this.currentUserValue ? true : false;
  }

  login(username: string, password: string) {
    if (username === "test" && password === "123456") {
      let user = {
        username,
        password
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(username);
    } else {
      return of("Failure!");
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartCourses');
    localStorage.removeItem('wishListedCourses');
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }

}
