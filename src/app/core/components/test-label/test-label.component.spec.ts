import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { EventEmitter } from '@angular/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { MatCardModule } from '@angular/material/card'

import { LabelComponent } from '../label/label.component'

import { TestLabelComponent } from './test-label.component'

describe('TestLabelComponent', () => {
  let component: TestLabelComponent
  let fixture: ComponentFixture<TestLabelComponent>

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

  const TranslateServiceStub = {
    get: (key: any) => of(key),
    onLangChange: new EventEmitter(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LabelComponent,
        TestLabelComponent,
      ],
      imports: [
        NoopAnimationsModule,
        TranslateModule,
        MatCardModule,
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: TranslateService, useValue: TranslateServiceStub },
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLabelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
