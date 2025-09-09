import { Routes } from '@angular/router';
import { DogpageComponent } from './components/dogpage/dogpage.component';
import { HomeComponent } from './components/home/home.component';
import { EmployepageComponent } from './components/employeepage/employeepage.component';

export const routes: Routes = [
  { path: 'dogs', component: DogpageComponent },
  { path: 'employees', component: EmployepageComponent },
  { path: '', component: HomeComponent },
];
