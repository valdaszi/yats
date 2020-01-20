import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core'
import { Subscription } from 'rxjs'

import { Test } from '@app/core/models/data/test'
import { TestsService } from '@app/core/models/services/tests.service'
import { TestsLabelService } from './test-label.service'


@Component({
  selector: 'app-test-label',
  templateUrl: './test-label.component.html',
  styleUrls: ['./test-label.component.scss']
})
export class TestLabelComponent implements OnInit, OnDestroy, OnChanges {

  @Input() testId: string

  test: Test
  testSubscription: Subscription

  constructor(
    private testsService: TestsService,
    private testsLabelService: TestsLabelService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.unsubscribe()
    if (changes.testId) {
      this.subscribe(changes.testId.currentValue)
    }
  }

  ngOnDestroy() {
    this.unsubscribe()
  }

  private unsubscribe() {
    if (this.testSubscription) {
      this.testSubscription.unsubscribe()
      this.testSubscription = null
    }
  }

  // kas efektyviau? :
  // - ar imti tiesiai dokumenta, paimti snapshotChanges() gaunama Observer ir prie jo subscribe()
  // - ar snapshotChanges() gaunama Observer issaugoti servise ir naudoti kur reikia tik subscribe()
  private subscribe(testId: string) {
    if (this.testId) {
      // this.testSubscription = this.testsService.get(testId).snapshotChanges().subscribe(data => {
      this.testSubscription = this.testsLabelService.get(testId).subscribe(data => {
        this.test = {
          id: data.payload.id,
          ...data.payload.data()
        } as Test
      })
    }
  }

}
