import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  constructor(private mainS: MainService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.mainS.getAllWishlistItems().subscribe(res => {
      console.log("res", res);
      this.whistlistCourses = res;
      this.originalCourses = res;
    });

    this.courseInCart = JSON.parse(localStorage.getItem("wishListedCourses")) || [];
  }

  filterData(query: string) {
    let queryInLowerCase = query.toLowerCase();
    if (queryInLowerCase === '' || queryInLowerCase.length === 0) {
      // console.log("originalCourses", this.originalCourses);     
      this.courseInCart = this.originalCourses;
    } else {
      this.courseInCart = this.originalCourses.filter((data) =>
        data.title.toLowerCase().includes(queryInLowerCase));
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

  addToCart(course: Course) {
    let found = [];
    var localData = JSON.parse(localStorage.getItem("wishListedCourses")) || [];
    if(localData.length > 0) {
      console.log("working", localData);
      found = localData.find(data => data.id == course.id);
      console.log("found", found);
    } 
    localData.push(course);
      localStorage.setItem("wishListedCourses", JSON.stringify(localData));
    
  }

  removeFromWishlist(course: Course) {
    
  }

}
