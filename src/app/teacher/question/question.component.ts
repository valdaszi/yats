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

  working: boolean
  testId: string
  test: Test
  question: Question
  answers: string | string[]
  points: { points?: number, explanation?: string }
  pointsWorking: boolean

  CheckType = QuestionType.Check
  RadioType = QuestionType.Radio
  TextType = QuestionType.Text

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testsService: TestsService,
    private menuService: MenuService
  ) {
    this.working = true
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as { test: Test, question: Question }
    if (state && state.test && state.question) {
      this.test = Object.assign({}, state.test)
      this.testId = this.test.id
      this.question = Object.assign({}, state.question)
      if (this.question.type === QuestionType.Check) {
        this.answers = []
      }
      this.working = false
      log.debug('[state]', this.question)

    } else {
      this.route.params.subscribe(params => {
        log.debug('[params]', params)
        this.getData(params.id, params.qid)
      })
    }
   }

  ngOnInit() {
    this.menuService.menu({})
  }

  async getData(testId: string, questionId: string) {
    this.testsService.getQuestion(testId, questionId).get().subscribe(async (question) => {
      this.testId = testId
      this.question = Object.assign({} as Question, question.data())
      this.question.id = questionId
      if (this.question.type === QuestionType.Check) {
        this.answers = []
      }
      this.test = {
        id: testId,
        ... (await this.testsService.get(testId).get().toPromise()).data()
      } as Test

      this.working = false
    })
  }

  onChange(answer: string) {
    if (!Array.isArray(this.answers)) {
      this.answers = []
    }
    const index = this.answers.indexOf(answer)
    if (index < 0) {
      this.answers.push(answer)
    } else {
      this.answers.splice(index, 1)
    }
  }

  async ok() {
    this.pointsWorking = true
    try {
      this.points = await this.testsService.testQuestionResult({
        test: this.test.id,
        question: this.question.id,
        calculations: this.test.calculations,
        answers: this.answers
      }).toPromise()
    } finally {
      this.pointsWorking = false
    }
  }

  getNumber(i: number) {
    if (this.test && this.test.numberingType) {
      return this.test.numberingType === 'A' ? String.fromCharCode('A'.charCodeAt(0) + i) :
        this.test.numberingType === 'N' ? i + 1 : ''
    }
    return ''
  }

}
