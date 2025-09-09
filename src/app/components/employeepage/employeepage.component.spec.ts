import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployepageComponent } from './employeepage.component';

describe('EmployepageComponent', () => {
  let component: EmployepageComponent;
  let fixture: ComponentFixture<EmployepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployepageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmployepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
