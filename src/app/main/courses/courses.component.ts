import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/model/courses';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  courses: Course[] = [];
  originalCourses: Course[] = [];
  courseInCart: Course[] = [];

  constructor(
    private mainS: MainService, 
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private modalS: ModalService) { }

  ngOnInit(): void {
    this.mainS.getAllCourses().subscribe(res => {
      this.courses = res;
      this.originalCourses = res;
    });

    this.mainS.getAllCartItems().subscribe(data => {
      this.courseInCart = data;
    });
  }

  filterData(query: string) {
    let queryInLowerCase = query.toLowerCase();
    if (queryInLowerCase === '' || queryInLowerCase.length === 0) {
      this.courseInCart = this.originalCourses;
    } else {
      this.courseInCart = this.originalCourses.filter((data) =>
        data.title.toLowerCase().includes(queryInLowerCase));
    }
  }

  onChange(filterBy: string) {
    switch(filterBy) {
      case "cp": 
        // this.courses = this.originalCourses;
        break;
      case "l2h": 
        this.courses = this.courses.sort((a, b) => a.discounted_price - b.discounted_price);
      break;
      case "h2l": 
        this.courses = this.courses.sort((a, b) => b.discounted_price - a.discounted_price);
      break;
    }  
  }
  
  updateCart(course: Course) {
    this.courseInCart.push(course);
  }

  addToCart(course: Course) {
    let alreadyExist = this.mainS.aLreadyExist(course, "cartCourses");
    if(!(alreadyExist)) {
      this.mainS.addToLocalStorage(course, "cartCourses");
      this.mainS.openModal(this.entry, "success", "Item added in cart!");
      this.updateCart(course);
    } else {
      this.sub = this.mainS.openModal(this.entry, "failure", "Item already exist in cart!");
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

  goToDetailPage(course: Course) {
    this.router.navigate([course.id], {relativeTo: this.route});
  }
 
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    };
  }
}
