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
  // Array for storing the subjects
  subjects: string[] = [];
  // Property for searchInput
  searchInput: string = '';
  // Prpoerty for selectvalue
  selectValue: string = '';
  // Create a instance of courseservice
  constructor(private courseservice: CourseService) {}

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      
      this.courseList = data;
      this.orgCourseList = data;

      // Change the level to comprehencable data
      this.courseList.forEach(course => {
        switch(course.level) {
          case 'GR':
            course.level = 'Grundläggande';
            break;
          case 'AV':
            course.level = 'Avancerad';
        }
      });

      // Take out subjects, remove the duplicates and rearrange in ascending order
      this.subjects = this.courseList.map(course => {
        return course.subject;
      }).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a.localeCompare(b));
    });
  }
  // Pick a subject from select
  chooseSubject() {
    // If subject is "unchoosen", show the original courselist
    if(this.selectValue === '') {
      this.courseList = this.orgCourseList;
    }
    // Pick out the courses that includes selelcted value
    this.courseList = this.courseList.filter(course => course.subject.includes(this.selectValue));
  }

  // Search for courses
  searchCourses() {
    // If serachInput is not an empty string
    if(this.searchInput.trim() !== '') {
      // Make input and possible searches lowercase and look for match
      this.courseList = this.courseList.filter( course => 
        course.courseName.toLowerCase().includes(this.searchInput.toLowerCase()) || course.courseCode.toLowerCase().includes(this.searchInput.toLowerCase()));
    } else {
      this.courseList = this.orgCourseList;
    }
  }

  // Filter coursename in ascending order
  nameAscending() {
    this.courseList.sort((a, b) => a.courseName.localeCompare(b.courseName));
  }

  // Filter coursename in descending order
  nameDescending() {
    this.courseList.sort((a, b) => b.courseName.localeCompare(a.courseName));
  }

  // Filter coursecode in ascending order
  codeAscending() {
    this.courseList.sort((a, b) => (a.courseCode > b.courseCode) ? 1 : -1);
  }

  // Filter coursecode in descending order
  codeDescending() {
    this.courseList.sort((a, b) => (b.courseCode > a.courseCode) ? 1 : -1);
  }

  // Filter coursepoints in ascending order
  pointsAscending() {
    this.courseList = this.courseList.sort(function(a, b){return a.points - b.points});
  }
  // Filter courspoints in descending order
  pointsDescending() {
    this.courseList = this.courseList.sort(function(a, b){return b.points - a.points});
  }

  
}

