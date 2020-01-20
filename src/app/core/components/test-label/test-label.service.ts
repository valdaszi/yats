import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Action, DocumentSnapshot } from '@angular/fire/firestore'
// import { DocumentReference, SetOptions, DocumentData, QueryFn, Action, DocumentSnapshot } from '../interfaces';

import { TestsService } from '@app/core/models/services/tests.service'
import { Test } from '@app/core/models/data/test'

@Injectable({
  providedIn: 'root'
})
export class TestsLabelService {

  private testId: string
  private testObservable: Observable<Action<DocumentSnapshot<Test>>>

  constructor(private testsService: TestsService) { }

  get(testId: string): Observable<Action<DocumentSnapshot<Test>>> {
    if (testId !== this.testId) {
      this.testId = testId
      this.testObservable = this.testsService.get(testId).snapshotChanges()
    }
    return this.testObservable
  }
}
