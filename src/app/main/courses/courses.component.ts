import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor() { }
  
  message = ""; 
  setMessage(message: string){ 
    this.message = message;  
  }  



  ngOnInit(): void {

  }

}
