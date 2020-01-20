import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignComponent } from './test-assign.component';

describe('TestAssignComponent', () => {
  let component: TestAssignComponent;
  let fixture: ComponentFixture<TestAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
