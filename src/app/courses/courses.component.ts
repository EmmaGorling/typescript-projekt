import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  //Arrays for storing the data
  courseList: Course[] = [];
  orgCourseList: Course[] = [];

  // Create a instance of courseservice
  constructor(private courseservice: CourseService) {}

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courseList = data;
      this.orgCourseList = data;
    })
  }
}

