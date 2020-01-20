import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

import { MenuService } from '@app/core/services/menu.service'
import { TestsService } from '@app/core/models/services/tests.service'
import { Test } from '@app/core/models/data/test'


@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit, OnDestroy {

  tests: Test[]
  model = {} as Test
  testSubscription: Subscription

  constructor(
    private testsService: TestsService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.menu({})
    this.testSubscription = this.testsService.list().snapshotChanges().subscribe(data => {
      this.tests = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Test
      })
    })
  }

  ngOnDestroy() {
    if (this.testSubscription) { this.testSubscription.unsubscribe() }
  }

  edit(model: Test) {
    this.router.navigate([model.id, 'edit'], {
      state: { model },
      relativeTo: this.route
    })
  }

  add() {
    this.router.navigate(['add'], {
      relativeTo: this.route
    })
  }

  showQuestions(model: Test) {
    this.router.navigate([model.id], {
      state: { model },
      relativeTo: this.route
    })
  }

  assign(model: Test) {
    this.router.navigate([model.id, 'assign'], {
      state: { model },
      relativeTo: this.route
    })
  }

}
