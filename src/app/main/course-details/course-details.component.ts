import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  courseId: string;
  constructor(
    private route: ActivatedRoute,
    private mainS: MainService
    ) { }

  ngOnInit(): void {
   this.courseId = this.route.snapshot.paramMap.get('id');
   this.mainS.getCourseById(this.courseId)
  }

}
