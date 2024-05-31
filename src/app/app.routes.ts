import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { MylistComponent } from './mylist/mylist.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'mylist', component: MylistComponent},
    {path: '**', redirectTo: ''}
];

