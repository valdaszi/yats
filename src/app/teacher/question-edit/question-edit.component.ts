import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { take } from 'rxjs/operators'

import { MenuService } from '@app/core/services/menu.service'
import { TestsService } from '@app/core/models/services/tests.service'
import { Question, Test, Answer, Choice, QuestionType } from '@app/core/models/data'
import { Logger } from '@app/core/services/logger.service'
import { Subscription } from 'rxjs'

const log = new Logger('QuestionEditComponent')

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit, OnDestroy {

  testId: string
  model: Question
  answer: Answer
  answerChanged: boolean

  questionSubscription: Subscription

  questionTypes = [
    { value: QuestionType.Text, label: 'Free text' },
    { value: QuestionType.Check, label: 'Multiple answer' },
    { value: QuestionType.Radio, label: 'Only one answer' }
  ]

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
      this.model = Object.assign({}, state.question)
      this.readAnswers(this.testId, this.model.id)
      log.debug('[state]', this.model)

    } else {
      this.route.params.subscribe(params => {
        log.debug('[params]', params)
        this.testId = params.id
        this.readAnswers(params.id, params.qid)
        this.questionSubscription = this.testsService.getQuestion(params.id, params.qid).valueChanges().pipe(take(1)).subscribe(model => {
          this.model = Object.assign({}, model)
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

  ngOnDestroy(): void {
    if (this.questionSubscription) { this.questionSubscription.unsubscribe() }
  }

  readAnswers(testId: string, questionId: string) {
    log.debug('[testId]', testId, '[questionId]', questionId)
    this.testsService.getQuestionAnswer(testId, questionId).valueChanges()
      .pipe(take(1))
      .subscribe(data => {
        this.answer = Object.assign({}, data)
        this.answer.id = questionId
        this.answerChanged = false
      })
  }

  private back() {
    this.router.navigate(['/teacher/test', this.testId])
  }

  cancel() {
    this.back()
  }

  save() {
    this.model.id ? this.update() : this.create()
  }

  delete(index: number, event: Event) {
    event.stopPropagation()
    if (this.model.type === QuestionType.Text) {
      if (this.answer.answers.length === 1) { return }
    } else {
      if (this.answer.answers.length <= 2) { return }
    }
    this.answer.answers.splice(index, 1)
    this.answerChanged = true
  }

  add(event: Event) {
    event.stopPropagation()
    this.answer.answers = this.answer.answers || []

    if (this.model.type === QuestionType.Text) {
      if (this.answer.answers.length > 0) { return }
      this.answer.answers.push({} as Choice)
    } else {
      this.answer.answers.push({} as Choice)
      if (this.answer.answers.length === 1) {
        this.answer.answers.push({} as Choice)
      }
    }
    this.answerChanged = true
  }

  answerOnChange() {
    this.answerChanged = true
  }

  private updateAnswers() {
    if (this.answerChanged) {
      this.model.answers = []
      if (this.answer.answers) {
        this.answer.answers.forEach(a => this.model.answers.push(a.answer))
      }
    }
  }

  async update() {
    const questionId = this.model.id
    this.updateAnswers()
    await this.testsService.updateQuestion(this.testId, this.model)
    if (this.answerChanged) {
      await this.testsService.saveQuestionAnswer(this.testId, questionId, this.answer)
    }
    this.back()
  }

  async create() {
    this.updateAnswers()
    const question = await this.testsService.createQuestion(this.testId, this.model)
    await this.testsService.saveQuestionAnswer(this.testId, question.id, this.answer)
    this.back()
  }
}
