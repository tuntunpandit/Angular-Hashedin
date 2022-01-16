import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/courses';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  courseInCart: Course[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
