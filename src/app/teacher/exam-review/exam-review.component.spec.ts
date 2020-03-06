import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MatProgressBarModule } from '@angular/material/progress-bar'

import { ExamReviewComponent } from './exam-review.component'

describe('ExamReviewComponent', () => {
  let component: ExamReviewComponent
  let fixture: ComponentFixture<ExamReviewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamReviewComponent],
      imports: [MatProgressBarModule]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamReviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
