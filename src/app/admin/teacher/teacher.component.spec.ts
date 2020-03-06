import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MatFormFieldModule } from '@angular/material/form-field'

import { TeacherComponent } from './teacher.component'

describe('TeacherComponent', () => {
  let component: TeacherComponent;
  let fixture: ComponentFixture<TeacherComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherComponent],
      imports: [MatFormFieldModule]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
