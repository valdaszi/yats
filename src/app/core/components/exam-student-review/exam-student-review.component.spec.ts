import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentReviewComponent } from './exam-student-review.component';

describe('ExamStudentReviewComponent', () => {
  let component: ExamStudentReviewComponent;
  let fixture: ComponentFixture<ExamStudentReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
