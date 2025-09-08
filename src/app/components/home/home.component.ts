import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CatServiceService } from '../../services/cat-service.service';
import { OnInit } from '@angular/core';
import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JsonPipe, AsyncPipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private catApi = inject(CatServiceService);
  data$ = new Observable<{ url: string; height: number; width: number }[]>();
  isloading = true;

  ngOnInit() {
    this.fetchNewCat();
  }
  fetchNewCat() {
    this.isloading = true;
    this.data$ = this.catApi.getCats().pipe(
      tap(() => {
        console.log('Cat data received');
      }),
      finalize(() => {
        this.isloading = false;
      })
    );
  }
}
