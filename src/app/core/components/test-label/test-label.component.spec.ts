import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLabelComponent } from './test-label.component';

describe('TestLabelComponent', () => {
  let component: TestLabelComponent;
  let fixture: ComponentFixture<TestLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
