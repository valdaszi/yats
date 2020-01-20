import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { take } from 'rxjs/operators'

import { MenuService } from '@app/core/services/menu.service'
import { TestsService } from '@app/core/models/services/tests.service'
import { Question, Test, QuestionType } from '@app/core/models/data'
import { Logger } from '@app/core/services/logger.service'

const log = new Logger('QuestionComponent')

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  testId: string
  test: Test
  model: Question
  answer: string

  CheckType = QuestionType.Check
  RadioType = QuestionType.Radio
  TextType = QuestionType.Text

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testsService: TestsService,
    private menuService: MenuService
  ) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as { test: Test, question: Question }
    if (state && state.test && state.question) {
      this.testId = state.test.id
      this.test = Object.assign({}, state.test)
      this.model = Object.assign({}, state.question)
      log.debug('[state]', this.model)

    } else {
      this.route.params.subscribe(params => {
        this.testsService.getQuestion(params.id, params.qid).valueChanges().pipe(take(1)).subscribe(model => {
          log.debug('[params]', params)
          this.testId = params.id
          this.model = Object.assign({} as Question, model)
          if (params.qid) {
            this.model.id = params.qid
          }
          log.debug('[db]', this.model)
        })
      })
    }
   }

  ngOnInit() {
    this.menuService.menu({})
  }

  ok() {
    this.router.navigate(['/teacher/test', this.testId], {
      state: {
        model: this.test
      }
    })
  }

}
