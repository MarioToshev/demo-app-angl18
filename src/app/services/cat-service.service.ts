import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatServiceService {
  private http = inject(HttpClient);

  getCats() {
    console.log('Fetching cats...');
    return this.http.get<{ url: string; height: number; width: number }[]>(
      'https://api.thecatapi.com/v1/images/search'
    );
  }
}
