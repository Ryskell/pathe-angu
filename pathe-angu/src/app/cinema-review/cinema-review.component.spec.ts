import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaReviewComponent } from './cinema-review.component';

describe('CinemaReviewComponent', () => {
  let component: CinemaReviewComponent;
  let fixture: ComponentFixture<CinemaReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CinemaReviewComponent]
    });
    fixture = TestBed.createComponent(CinemaReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
