import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStatusComponent } from './exam-status.component';

describe('ExamStatusComponent', () => {
  let component: ExamStatusComponent;
  let fixture: ComponentFixture<ExamStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
