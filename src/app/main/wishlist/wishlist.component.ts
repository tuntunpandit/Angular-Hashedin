import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/model/courses';
import { MainService } from '../main.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  whistlistCourses: Course[] = [];
  originalCourses: Course[] = [];
  courseInCart: Course[] = [];
  totalCartAmount: any;
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  constructor(
    private mainS: MainService, 
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchAllWishlistItems();
    this.fetchAllCartItems();
  }

  fetchAllWishlistItems() {
    this.mainS.getAllWishlistItems().subscribe(res => {
      this.whistlistCourses = res;
      this.originalCourses = res;
    });
  }

  fetchAllCartItems() {
    this.mainS.getAllCartItems().subscribe(data => {
      this.courseInCart = data;
      this.totalCartAmount = this.calculateTotal(this.courseInCart);
    });
  }

  calculateTotal(courses: Course[]) {
    let total = courses.reduce((acc, next) => {
      return Number(acc) + Number(next.discounted_price);
    }, 0);

    return total.toFixed(2);
  }

  filterData(query: string) {
    let queryInLowerCase = query.toLowerCase();
    if (queryInLowerCase === '' || queryInLowerCase.length === 0) {
      // console.log("originalCourses", this.originalCourses);     
      this.whistlistCourses = this.originalCourses;
    } else {
      this.whistlistCourses = this.originalCourses.filter((data) =>
        data.title.toLowerCase().includes(queryInLowerCase) ||
        data.author.toLowerCase().includes(queryInLowerCase));
    }
  }

  onChange(filterBy: string) {
    switch(filterBy) {
      case "cp": 
        // console.log(this.whistlistCourses);
        this.whistlistCourses = this.originalCourses;
        break;
      case "l2h": 
        this.whistlistCourses = this.whistlistCourses.sort((a, b) => a.discounted_price - b.discounted_price);
      break;
      case "h2l": 
        this.whistlistCourses = this.whistlistCourses.sort((a, b) => b.discounted_price - a.discounted_price);
      break;
    }  
  }

  updateCart(course: Course) {
    this.courseInCart.push(course);
    this.totalCartAmount = this.calculateTotal(this.courseInCart);
  }

  addToCart(course: Course) {
    let alreadyExist = this.mainS.aLreadyExist(course, "cartCourses");
    if(!(alreadyExist)) {
      this.mainS.openModal(this.entry, "success", "Item will be added in cart!").subscribe(v => {
        this.mainS.addToLocalStorage(course, "cartCourses");
        this.updateCart(course);
      });
      
    } else {
      this.sub = this.mainS.openModal(this.entry, "failure", "Item already exist in cart!").subscribe(v => {});
    }
  }

  removeFromWishlist(course: Course) {
    let alreadyExist = this.mainS.aLreadyExist(course, "wishListedCourses");
    // console.log("alreadyExist", alreadyExist);
    if(alreadyExist) {
      this.mainS.openModal(this.entry, "success", "Item will be deleted from wishlist!").subscribe(v => {
        this.mainS.deleteFromLocalStorage(course, "wishListedCourses");
        this.fetchAllWishlistItems();
      });
    }
  }

  goToDetailPage(course: Course) {
    this.router.navigate(['../courses', course.id], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    };
  }

}
