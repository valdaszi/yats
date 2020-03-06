import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CoreModule } from '@app/core/core.module'

import { DialogConfirmationComponent } from './dialog-confirmation.component'

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent
  let fixture: ComponentFixture<DialogConfirmationComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmationComponent ],
      imports: [
        CoreModule
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
