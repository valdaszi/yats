import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { take } from 'rxjs/operators'

import { MenuService } from '@app/core/services/menu.service'
import { TestsService } from '@app/core/models/services/tests.service'
import { Test } from '@app/core/models/data/test'
import { Logger } from '@app/core/services/logger.service'

const log = new Logger('TestEditComponent')

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss']
})
export class TestEditComponent implements OnInit {

  model: Test
  numberingTypes = [
    { value: undefined, label: 'None' },
    { value: 'A', label: 'Alphabetic' },
    { value: 'N', label: 'Numeric' }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testsService: TestsService,
    private menuService: MenuService
  ) {
    const navigation = this.router.getCurrentNavigation()
    if (!navigation || !navigation.extras) { return }
    const state = navigation.extras.state as { model: Test }
    if (state && state.model) {
      this.model = Object.assign({}, state.model)
      this.initModel()
      log.debug('[state]', this.model)
    } else {
      this.route.params.subscribe(params => {
        log.debug(params)
        this.testsService.get(params.id).valueChanges().pipe(take(1)).subscribe(model => {
          this.model = Object.assign({}, model)
          this.initModel()
          if (params.id) {
            this.model.id = params.id
          }
          log.debug('[db]', this.model)
        })
      })
    }
  }

  ngOnInit() {
    this.menuService.menu({})
  }

  initModel() {
    this.model.calculations = this.model.calculations || {}
  }

  private back() {
    this.router.navigate(['/teacher/test'])
  }

  cancel() {
    this.back()
  }

  save() {
    if (!this.model.numberingType) { delete this.model.numberingType }
    this.model.id ? this.update() : this.create()
  }

  async update() {
    await this.testsService.update(this.model)
    this.back()
  }

  async create() {
    await this.testsService.create(this.model)
    this.back()
  }

}
