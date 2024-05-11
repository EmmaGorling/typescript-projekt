import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class MylistService {

  constructor() { }

  // Get mycourses from local storage
  getMyCourses() {
    const myCourses = localStorage.getItem('myCourses');
    if(myCourses) {
      return JSON.parse(myCourses)
    }
    return null;
  }

  // Delete course from local storage
  deleteCourse(course: Course) {
    // Get courses from local storage or send empty array
    let myCourses = JSON.parse(localStorage.getItem('myCourses') || '[]' );
    // Find the index of the course 
    const index = myCourses.findIndex((c: Course) => c.courseCode === course.courseCode);
    // Check the index
    if(index !== -1) {
      // Remove from array
      myCourses.splice(index, 1);
      // Store to localstorage
      localStorage.setItem('myCourses', JSON.stringify(myCourses));
    }
  }
}
