import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/model/courses';
import { MainService } from '../main.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  originalCourses: Course[] = [];
  coursesInCart: Course[] = [];
  allPrice: any;
  constructor(private mainS: MainService) { }

  ngOnInit(): void {
     this.fetchAllCartItems();
  }

  fetchAllCartItems() {
    this.mainS.getAllCartItems().subscribe(res => {
      this.coursesInCart = res;
      this.originalCourses = res;
      this.allPrice = this.calculateTotal(this.coursesInCart);
    });
  }

  calculateTotal(courses: Course[]) {
    let totalDiscountedPrice = courses.reduce((acc, next) => {
      return Number(acc) + Number(next.discounted_price);
    }, 0);

    let totalActualPrice = courses.reduce((acc, next) => {
      return Number(acc) + Number(next.actual_price);
    }, 0);
    let totalSaved = totalActualPrice - totalDiscountedPrice;
    return {
      "total": totalDiscountedPrice.toFixed(2),
      "saved": totalSaved.toFixed(2)
    }
  }

  addToWishlist(course: Course) {
    let alreadyExist = this.mainS.aLreadyExist(course, "wishListedCourses");
    if(!(alreadyExist)) {
      this.mainS.addToLocalStorage(course, "wishListedCourses");
      this.mainS.openModal(this.entry, "success", "Item added in wishlist!");
    } else {
      this.mainS.openModal(this.entry, "failure", "Item already exist in wishlist!");
    }
  }

  removeFromCart(course: Course) {
    let alreadyExist = this.mainS.aLreadyExist(course, "cartCourses");
    if(alreadyExist) {
      this.mainS.deleteFromLocalStorage(course, "cartCourses");
      this.fetchAllCartItems();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    };
  }
}
