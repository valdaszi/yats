import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { take } from 'rxjs/operators'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { MenuService } from '@app/core/services/menu.service'
import { Test } from '@app/core/models/data'
import { TestsService } from '@app/core/models/services/tests.service'

@Component({
  selector: 'app-test-assign',
  templateUrl: './test-assign.component.html',
  styleUrls: ['./test-assign.component.scss']
})
export class TestAssignComponent implements OnInit {

  test: Test

  constructor(
    private testsService: TestsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private menuService: MenuService
  ) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as { model: Test }
    if (state && state.model) {
      this.test = Object.assign({}, state.model)
    } else {
      this.route.params.subscribe(params => {
        this.testsService.get(params.id).valueChanges().pipe(take(1)).subscribe(model => {
          this.test = Object.assign({}, model)
          if (params.id) {
            this.test.id = params.id
          }
        })
      })
    }
  }


  ngOnInit() {
    this.menuService.menu({})
  }

}
