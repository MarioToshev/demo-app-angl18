import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogpageComponent } from './dogpage.component';

describe('DogpageComponent', () => {
  let component: DogpageComponent;
  let fixture: ComponentFixture<DogpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogpageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
