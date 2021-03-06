import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Course } from '../model/courses';
import { ModalService } from '../shared/components/modal/modal.service';
import { catchError, filter, map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  bodyData = JSON.stringify({
    "username": "test",
    "password": "123456"
  })
  constructor(private _http: HttpClient, private modalS: ModalService) { }

  getUserProfileData(): Observable<any> {
    let localData = JSON.parse(localStorage.getItem("userData")) || {};
    if(!(Object.getOwnPropertyNames(localData).length === 0)) {
      return of(localData);
    } else {
      return this._http.get("./assets/user.json");
    }
  }

  getAllCourses(): Observable<any> {
    return this._http.get("./assets/data.json");
  } 

  getAllWishlistItems(): Observable<any> {
    let wishlisted = JSON.parse(localStorage.getItem("wishListedCourses")) || [];
    return of(wishlisted);
  }

  getAllCartItems(): Observable<any> {
    let wishlisted = JSON.parse(localStorage.getItem("cartCourses")) || [];
    return of(wishlisted);
  }

  getCourseById(id: string): Observable<any> {
    let found = this._http.get("./assets/data.json").pipe(
      map(data => {
         const jsonData = JSON.stringify(data);
         return JSON.parse(jsonData).filter(d => d.id == id);
      }),
      // catchError(this.handleError)
    );
    return found;
  }

  addToLocalStorage(course: Course, type) {
    let localData = JSON.parse(localStorage.getItem(type)) || [];
    localData.push(course);
    localStorage.setItem(type, JSON.stringify(localData));
  }

  deleteFromLocalStorage(course: Course, type) {
    let localData = JSON.parse(localStorage.getItem(type)) || [];
    let index = localData.findIndex(x => x.id === course.id);
    if (index !== -1) {
      localData.splice(index, 1);
      localStorage.setItem(type, JSON.stringify(localData));
    }
  }

  aLreadyExist(course: Course, type) {
    let localData = JSON.parse(localStorage.getItem(type)) || [];
    if(localData.length > 0) {
      const found = localData.some(data => data.id == course.id);
      if(!found) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  openModal(entry, type, message) {
    return this.modalS.openModal(entry, type, message);
  }

  deleteAllCartItemsFromLocal(type: string) {
    localStorage.removeItem(type);
  }
  
  saveUserData(userData: User): Observable<any> {
    localStorage.setItem("userData", JSON.stringify(userData));
    return of(userData);
  }
}
