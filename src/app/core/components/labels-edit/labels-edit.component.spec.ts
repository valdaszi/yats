import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { of } from 'rxjs'

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'

import { AngularFirestore } from '@angular/fire/firestore'
import { ConfigService } from '@app/core/services/config.service'

import { LabelsEditComponent } from './labels-edit.component'

describe('LabelsEditComponent', () => {
  let component: LabelsEditComponent
  let fixture: ComponentFixture<LabelsEditComponent>

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

  const ConfigServiceStub = {
    config: of()
  }
  const TranslateServiceStub = {
    get: (key: any) => of(key)
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsEditComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        TranslateModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        { provide: TranslateService, useValue: TranslateServiceStub },
        { provide: ConfigService, useValue: ConfigServiceStub }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
