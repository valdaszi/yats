import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'

import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { CoreModule } from '@app/core/core.module'

import { TestEditComponent } from './test-edit.component'

describe('TeacherTestComponent', () => {
  let component: TestEditComponent
  let fixture: ComponentFixture<TestEditComponent>

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
      declarations: [TestEditComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        CoreModule,
        TranslateModule,
        RouterTestingModule
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
    fixture = TestBed.createComponent(TestEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
