import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

import { TestsLookupService } from './test-lookup.service'
import { Test } from '@app/core/models/data'

@Component({
  selector: 'app-test-lookup',
  templateUrl: './test-lookup.component.html',
  styleUrls: ['./test-lookup.component.scss']
})
export class TestLookupComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<Test>()

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  tests: Test[]
  testSubscription: Subscription
  dataSource: MatTableDataSource<Test>
  displayedColumns: string[] = ['position', 'name', 'description', 'questions', 'duration']

  constructor(private testsLookupService: TestsLookupService) { }

  ngOnInit() {
    this.testSubscription = this.testsLookupService.tests.subscribe(data => {
      this.tests = data
      this.dataSource = new MatTableDataSource<Test>(this.tests)
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnDestroy() {
    if (this.testSubscription) { this.testSubscription.unsubscribe() }
  }

  select(test: Test) {
    this.selected.emit(test)
  }

}
