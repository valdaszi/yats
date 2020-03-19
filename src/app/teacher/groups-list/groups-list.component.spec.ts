import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'

import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { CoreModule } from '@app/core/core.module'

import { GroupsListComponent } from './groups-list.component'

describe('GroupsListComponent', () => {
  let component: GroupsListComponent
  let fixture: ComponentFixture<GroupsListComponent>

  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    collection: (path: string) => {
      // return mocked collection here
      return {
        snapshotChanges: () => of()
      }
    },
    doc: (path: string) => {
      return {
        valueChanges: () => of()
      }
    }
  }
  const AngularFireFunctionsStub = {}
  const AngularFireAuthStub = {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsListComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        CoreModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
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
