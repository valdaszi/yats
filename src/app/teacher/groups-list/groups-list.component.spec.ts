import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'

import { GroupsListComponent } from './groups-list.component'

describe('GroupsListComponent', () => {
  let component: GroupsListComponent
  let fixture: ComponentFixture<GroupsListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsListComponent],
      imports: [
        MatCheckboxModule,
        MatFormFieldModule
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
