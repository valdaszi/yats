import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatDividerModule } from '@angular/material/divider'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { CoreModule } from '@app/core/core.module'
import { AuthService } from '@app/core/services/auth.service'

import { ExamComponent } from './exam.component'

describe('ExamComponent', () => {
  let component: ExamComponent
  let fixture: ComponentFixture<ExamComponent>

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
  const AuthServiceStub = {
    user: of()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        MatProgressBarModule,
        MatDividerModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AuthService, useValue: AuthServiceStub },
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
