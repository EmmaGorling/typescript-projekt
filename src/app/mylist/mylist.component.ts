import { Component } from '@angular/core';
import { Course } from '../model/course';
import { MylistService } from '../services/mylist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mylist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mylist.component.html',
  styleUrl: './mylist.component.scss'
})
export class MylistComponent {

  // Array from storing courses from LS
  myCourses: Course[] = [];
  // Storing points
  points: number = 0;

  // Create instance of mylistservice
  constructor(private mylistservice: MylistService) { }

  ngOnInit() {
    // Get mycourses from LS
    this.myCourses = this.mylistservice.getMyCourses();
    // Reset points
    this.points = 0;
    // Add upp the points from mycourse
    for(let i = 0; i < this.myCourses.length; i++) {
      this.points += this.myCourses[i].points;
    }
  }

  // Remove course from mycourses and LS
  deleteCourse(course: Course) {
    this.mylistservice.deleteCourse(course);
    this.ngOnInit();
  }
}
