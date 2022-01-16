import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Course } from '../model/courses';
import { filter } from 'rxjs/operators';
import { ModalService } from '../shared/components/modal/modal.service';

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
    return this._http.get("./assets/user.json");
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
    return this._http.get("./assets/user.json", {});
  }

  addToLocalStorage(course: Course, type) {
    let localData = JSON.parse(localStorage.getItem(type)) || [];
    localData.push(course);
    localStorage.setItem(type, JSON.stringify(localData));
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
    return this.modalS
      .openModal(entry, type, message)
      .subscribe((v) => {

      });
  }
  
}
