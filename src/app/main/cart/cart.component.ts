import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/courses';
import { MainService } from '../main.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  originalCourses: Course[] = [];
  coursesInCart: Course[] = [];
  constructor(private mainS: MainService) { }

  ngOnInit(): void {
    this.mainS.getAllWishlistItems().subscribe(res => {
      console.log("res", res);
      this.coursesInCart = res;
      this.originalCourses = res;
    });
  }

}
