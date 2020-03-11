import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { MatProgressBarModule } from '@angular/material/progress-bar'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { AuthService } from '@app/core/services/auth.service'
import { CoreModule } from '@app/core/core.module'
import { MarkdownModule } from 'ngx-markdown'

import { ExamReviewComponent } from './exam-review.component'

describe('ExamReviewComponent', () => {
  let component: ExamReviewComponent
  let fixture: ComponentFixture<ExamReviewComponent>

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
      declarations: [ExamReviewComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        MarkdownModule,
        MatProgressBarModule
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
    fixture = TestBed.createComponent(ExamReviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
