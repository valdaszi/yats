import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { EventEmitter } from '@angular/core'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { AuthService } from '@app/core/services/auth.service'
import { CoreModule } from '@app/core/core.module'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { GroupAssignTestComponent } from './group-assign-test.component'

describe('GroupAssignTestComponent', () => {
  let component: GroupAssignTestComponent
  let fixture: ComponentFixture<GroupAssignTestComponent>

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
  const AuthServiceStub = {
    user: of()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAssignTestComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        CoreModule,
        TranslateModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: TranslateService, useValue: TranslateServiceStub },
        { provide: AuthService, useValue: AuthServiceStub },
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAssignTestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
