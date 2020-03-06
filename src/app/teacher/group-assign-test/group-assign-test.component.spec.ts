import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { CoreModule } from '@app/core/core.module'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { GroupAssignTestComponent } from './group-assign-test.component'

describe('GroupAssignTestComponent', () => {
  let component: GroupAssignTestComponent
  let fixture: ComponentFixture<GroupAssignTestComponent>

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
  const TranslateServiceStub = {
    get: (key: any) => of(key)
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAssignTestComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        TranslateModule
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
    fixture = TestBed.createComponent(GroupAssignTestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
