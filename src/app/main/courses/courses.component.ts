import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/courses';
import { MainService } from '../main.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  originalCourses: Course[] = [];
  constructor(private mainS: MainService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.mainS.getAllCourses().subscribe(res => {
      // console.log("res", res);
      this.courses = res;
      // this.originalCourses = res;
    })
  }

  filterData(filterBy: string) {
    
  }

  onChange(filterBy: string) {
    switch(filterBy) {
      case "cp": 
        console.log(this.courses);
        break;
      case "l2h": 
        this.courses = this.courses.sort((a, b) => a.discounted_price - b.discounted_price);
      break;
      case "h2l": 
        this.courses = this.courses.sort((a, b) => b.discounted_price - a.discounted_price);
      break;
    }  
  }

}
