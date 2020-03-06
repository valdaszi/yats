import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'

import { CoreModule } from '@app/core/core.module'

import { TestAssignComponent } from './test-assign.component'

describe('TestAssignComponent', () => {
  let component: TestAssignComponent
  let fixture: ComponentFixture<TestAssignComponent>

  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    collection: (path: string) => {
      // return mocked collection here
    },
    doc: (path: string) => {
      return {
        valueChanges: () => of()
      }
    }
  }
  const AngularFireFunctionsStub = {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAssignComponent],
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
