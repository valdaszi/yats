import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { shareReplay, tap, map } from 'rxjs/operators'

import { TestsService } from '@app/core/models/services/tests.service'
import { Test } from '@app/core/models/data/test'

import { Logger } from '@app/core/services/logger.service'

const log = new Logger('TestSelectService')

@Injectable({
  providedIn: 'root'
})
export class TestSelectService {

  private tests: Observable<Test[]>

  constructor(private testsService: TestsService) {
    this.tests = this.testsService.list().snapshotChanges()
      .pipe(
        tap(_ => log.debug('TestSelectService executed')),
        map(data =>
          data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Test
          })
        ),
        shareReplay(1)
      )
  }

  getTests(): Observable<Test[]> {
    return this.tests ? this.tests : of()
  }
}
