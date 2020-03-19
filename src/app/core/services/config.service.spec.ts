import { TestBed } from '@angular/core/testing'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'

import { ConfigService } from './config.service'

describe('ConfigService', () => {
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

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: AngularFirestoreStub }
    ]
  }))

  it('should be created', () => {
    const service: ConfigService = TestBed.inject(ConfigService)
    expect(service).toBeTruthy()
  })
})
