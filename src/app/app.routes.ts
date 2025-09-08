import { Routes } from '@angular/router';
import { DogpageComponent } from './components/dogpage/dogpage.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'dogs', component: DogpageComponent },
  { path: '', component: HomeComponent },
];
