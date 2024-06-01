import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course';
import { MylistService } from '../services/mylist.service';

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
  resetCourseList: Course[] = [];
  // Array for storing the subjects
  subjects: string[] = [];
  // Property for searchInput
  searchInput: string = '';
  // Prpoerty for selectvalue
  selectValue: string = '';
  chosenSort: string = '';
  // Storing selected courses
  selectedCourses:Course[] = [];
  // Create a instance of courseservice
  constructor(private courseservice: CourseService, private myListService: MylistService) {}

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      
      this.courseList = data;
      this.orgCourseList = data;
      this.resetCourseList = data;

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
      this.orgCourseList = this.resetCourseList;
      this.courseList = this.resetCourseList;
    } else {
      // Pick out the courses that includes selected value
      this.orgCourseList = this.resetCourseList.filter(course => course.subject.includes(this.selectValue));
      this.courseList = this.orgCourseList;
    }
  }

  // Search for courses
  searchCourses() {
    // If serachInput is not an empty string
    if(this.searchInput.trim() !== '') {
      // Make input and possible searches lowercase and look for match
      this.courseList = this.orgCourseList.filter( course => 
        course.courseName.toLowerCase().includes(this.searchInput.toLowerCase()) || 
        course.courseCode.toLowerCase().includes(this.searchInput.toLowerCase()));
    } else {
      this.courseList = this.orgCourseList;
    }
  }

  // Add course to local storage
  addCourse(course: Course) {
    this.myListService.addCourse(course);
    const index = this.selectedCourses.indexOf(course);
    if (index === -1) {
      this.selectedCourses.push(course);
    }
  }
  // Check if selected
  selected(course: Course):boolean {
    return this.selectedCourses.includes(course);
  }

  // Filter by select
  sort() {
    switch(this.chosenSort) {
      case 'codeAsc': {
        this.courseList = this.orgCourseList.sort((a, b) => (a.courseCode > b.courseCode) ? 1 : -1);
        break;
      }
      case 'codeDesc': {
        this.courseList = this.orgCourseList.sort((a, b) => (b.courseCode > a.courseCode) ? 1 : -1);
        break;
      }
      case 'nameAsc': {
        this.courseList = this.orgCourseList.sort((a, b) => a.courseName.localeCompare(b.courseName));
        break;
      }
      case 'nameDesc': {
        this.courseList = this.orgCourseList.sort((a, b) => b.courseName.localeCompare(a.courseName));
        break;
      }
      case 'subjectAsc': {
        this.courseList = this.orgCourseList.sort((a, b) => a.subject.localeCompare(b.subject));
        break;
      }
      case 'subjectDesc': {
        this.courseList = this.orgCourseList.sort((a, b) => b.subject.localeCompare(a.subject));
        break;
      }
      case 'pointsAsc': {
        this.courseList = this.orgCourseList.sort(function(a, b){return a.points - b.points});
        break;
      }
      case 'pointsDesc': {
        this.courseList = this.orgCourseList.sort(function(a, b){return b.points - a.points});
        break;
      }
    }
  }
}

