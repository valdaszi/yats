import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssignTestComponent } from './group-assign-test.component';

describe('GroupAssignTestComponent', () => {
  let component: GroupAssignTestComponent;
  let fixture: ComponentFixture<GroupAssignTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAssignTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAssignTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
