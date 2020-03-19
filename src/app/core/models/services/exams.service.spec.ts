import { TestBed } from '@angular/core/testing'

import { of } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'

import { ExamsService } from './exams.service'

describe('ExamsService', () => {
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
  const AngularFireFunctionsStub = {
  }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: AngularFirestoreStub },
      { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub }
    ]
  }))

  it('should be created', () => {
    const service: ExamsService = TestBed.inject(ExamsService)
    expect(service).toBeTruthy()
  });
});
