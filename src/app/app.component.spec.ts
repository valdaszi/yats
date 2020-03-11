import { TestBed, async } from '@angular/core/testing'
import { EventEmitter } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

import { CoreModule } from '@app/core/core.module'

import { of } from 'rxjs'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from '@app/core/services/auth.service'

import { AppComponent } from './app.component'

describe('AppComponent', () => {

  const TranslateServiceStub = {
    get: (key: any) => of(key),
    onLangChange: new EventEmitter(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
    setTranslation: () => { }
  }

  const AngularFireAuthStub = {}
  const AuthServiceStub = {
    user: of()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        RouterTestingModule,
        CoreModule,
        TranslateModule
      ],
      providers: [
        { provide: TranslateService, useValue: TranslateServiceStub },
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
      ]
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
