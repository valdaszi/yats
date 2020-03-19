import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { EventEmitter } from '@angular/core'

import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'

import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { AuthService } from '@app/core/services/auth.service'

import { TestSelectComponent } from './test-select.component'

describe('TestSelectComponent', () => {
  let component: TestSelectComponent
  let fixture: ComponentFixture<TestSelectComponent>

  const AngularFirestoreStub = {
    collection: () => {
      return {
        snapshotChanges: () => of()
      }
    },
    doc: () => {
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
      declarations: [ TestSelectComponent ],
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        TranslateModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: TranslateService, useValue: TranslateServiceStub },
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
