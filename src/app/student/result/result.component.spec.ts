import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { MatProgressBarModule } from '@angular/material/progress-bar'
import { CoreModule } from '@app/core/core.module'
import { AuthService } from '@app/core/services/auth.service'

import { ResultComponent } from './result.component'

describe('ResultComponent', () => {
  let component: ResultComponent
  let fixture: ComponentFixture<ResultComponent>

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
  const AngularFireFunctionsStub = {}
  const AngularFireAuthStub = {}
  const AuthServiceStub = {
    user: of()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        MatProgressBarModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
