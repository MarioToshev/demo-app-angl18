import { Component } from '@angular/core';
import { OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DogServiceService } from '../../services/dog-service.service';
import { JsonPipe, AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dogpage',
  standalone: true,
  imports: [CommonModule, JsonPipe, AsyncPipe, RouterLink],
  templateUrl: './dogpage.component.html',
  styleUrl: './dogpage.component.css',
})
export class DogpageComponent implements OnInit {
  private dogApi = inject(DogServiceService);
  data$ = new Observable<{ url: string; height: number; width: number }[]>();
  isloading = true;

  ngOnInit() {
    this.fetchNewDog();
  }

  fetchNewDog() {
    this.isloading = true;
    this.data$ = this.dogApi.getDogs().pipe(
      tap(() => {
        console.log('Dog data received');
      }),
      finalize(() => {
        this.isloading = false;
      })
    );
  }
}
