import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { MarkdownModule } from 'ngx-markdown'

import { CoreModule } from '@app/core/core.module'

import { QuestionsListComponent } from './questions-list.component'

describe('QuestionsListComponent', () => {
  let component: QuestionsListComponent
  let fixture: ComponentFixture<QuestionsListComponent>

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
      declarations: [QuestionsListComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        MarkdownModule,
        MatIconModule,
        MatDividerModule
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
    fixture = TestBed.createComponent(QuestionsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
