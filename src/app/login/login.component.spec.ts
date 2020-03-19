import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { MatIconModule } from '@angular/material/icon'

import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { AuthService } from '@app/core/services/auth.service'

import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

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
  const AngularFireAuthStub = {
    auth: {
      app: {
        options: {}
      }
    }
  }
  const AuthServiceStub = {
    user: of()
  }
  const TranslateServiceStub = {
    get: (key: any) => of(key),
    onLangChange: new EventEmitter(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        TranslateModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: TranslateService, useValue: TranslateServiceStub },
        { provide: FormBuilder, useValue: {} }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
