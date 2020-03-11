import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { EventEmitter } from '@angular/core'

import { of } from 'rxjs'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { DialogConfirmationComponent } from './dialog-confirmation.component'

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent
  let fixture: ComponentFixture<DialogConfirmationComponent>

  const TranslateServiceStub = {
    get: (key: any) => of(key),
    onLangChange: new EventEmitter(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmationComponent ],
      imports: [
        TranslateModule,
        MatDialogModule
      ],
      providers: [
        { provide: TranslateService, useValue: TranslateServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
