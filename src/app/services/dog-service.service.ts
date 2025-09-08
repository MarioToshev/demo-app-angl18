import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DogServiceService {
  private http = inject(HttpClient);

  getDogs() {
    console.log('Fetching dogs...');
    return this.http.get<{ url: string; height: number; width: number }[]>(
      'https://api.thedogapi.com/v1/images/search'
    );
  }
}
