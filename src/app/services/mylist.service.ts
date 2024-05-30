import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class MylistService {
  // Array for storing my courses
  myCourses: Course[] = [];

  constructor() { }

  // Get mycourses from local storage
  getMyCourses() {
    const storedCourses = localStorage.getItem('myCourses');
    if(storedCourses) {
      this.myCourses = JSON.parse(storedCourses);
      return this.myCourses;
    }
    return null;
  }

  addCourse(course:Course) {
    this.myCourses.push(course);
    localStorage.setItem('myCourses', JSON.stringify(this.myCourses));
  }

  // Delete course from local storage
  deleteCourse(course: Course) {
    // Get courses from local storage or send empty array
    let storedCourses = JSON.parse(localStorage.getItem('myCourses') || '[]' );
    // Find the index of the course 
    const index = storedCourses.findIndex((c: Course) => c.courseCode === course.courseCode);
    // Check the index
    if(index !== -1) {
      // Remove from array
      this.myCourses.splice(index, 1);
      // Store to localstorage
      localStorage.setItem('myCourses', JSON.stringify(this.myCourses));
    }
  }
}
