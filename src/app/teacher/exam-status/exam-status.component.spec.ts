import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatDialogModule } from '@angular/material/dialog'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { ExamStatusComponent } from './exam-status.component'

describe('ExamStatusComponent', () => {
  let component: ExamStatusComponent
  let fixture: ComponentFixture<ExamStatusComponent>

  const AngularFirestoreStub = {
    collection: (path: string) => {
      return {
        snapshotChanges: () => of()
      }
    },
    doc: (path: string) => {
      return {
        valueChanges: () => of(),
        collection: () => {
          return {
            snapshotChanges: () => of()
          }
        }
      }
    }
  }
  const AngularFireFunctionsStub = {}
  const AngularFireAuthStub = {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStatusComponent ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatProgressBarModule,
        MatDialogModule
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
    fixture = TestBed.createComponent(ExamStatusComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
