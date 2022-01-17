import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/model/courses';
import { MainService } from '../main.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  course: Course;
  courseId: string;
  constructor(
    private route: ActivatedRoute,
    private mainS: MainService
    ) { }

  ngOnInit(): void {
   this.courseId = this.route.snapshot.paramMap.get('id');
   this.mainS.getCourseById(this.courseId).subscribe(data => {
     console.log("d", data);
     this.course = data;
   })
  }

  addToCart(course: Course) {
    let alreadyExist = this.mainS.aLreadyExist(course, "cartCourses");
    if(!(alreadyExist)) {
      this.mainS.openModal(this.entry, "success", "Item will be added in cart!").subscribe(v => {
        this.mainS.addToLocalStorage(course, "cartCourses");
        // this.updateCart(course);
      });
    } else {
      this.sub = this.mainS.openModal(this.entry, "failure", "Item already exist in cart!").subscribe(v => { });
    }
  }

  addToWishlist(course: Course) {
    let alreadyExist = this.mainS.aLreadyExist(course, "wishListedCourses");
    if(!(alreadyExist)) {
      this.mainS.openModal(this.entry, "success", "Item will be added in wishlist!").subscribe(v => {
        this.mainS.addToLocalStorage(course, "wishListedCourses");
      });
    } else {
      this.mainS.openModal(this.entry, "failure", "Item already exist in wishlist!").subscribe(v => {});
    }
  }

}
