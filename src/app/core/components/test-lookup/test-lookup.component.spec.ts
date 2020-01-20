import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLookupComponent } from './test-lookup.component';

describe('TestLookupComponent', () => {
  let component: TestLookupComponent;
  let fixture: ComponentFixture<TestLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
