import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AngularFireAuth } from '@angular/fire/auth'

import { RouterTestingModule } from '@angular/router/testing'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'

import { MarkdownModule } from 'ngx-markdown'

import { CoreModule } from '@app/core/core.module'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { QuestionEditComponent } from './question-edit.component'

describe('QuestionEditComponent', () => {
  let component: QuestionEditComponent
  let fixture: ComponentFixture<QuestionEditComponent>

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
      declarations: [QuestionEditComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatIconModule,
        CoreModule,
        TranslateModule,
        MarkdownModule,
        RouterTestingModule
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
    fixture = TestBed.createComponent(QuestionEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
