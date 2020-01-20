import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'

import * as firebase from 'firebase/app'

import { MatDialog } from '@angular/material/dialog'

import { MenuService } from '@app/core/services/menu.service'
import { ExamsService } from '@app/core/models/services/exams.service'
import { AuthService } from '@app/core/services/auth.service'
import { Exam, ExamResult, Question, QuestionType } from '@app/core/models/data'
import { DialogConfirmComponent } from '@app/core/components/dialog-confirm/dialog-confirm.component'

interface ActiveQuestion {
  question: Question,
  answer?: string | string[]
  answerSaved?: string | string[]
  done?: boolean
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  CheckType = QuestionType.Check
  RadioType = QuestionType.Radio
  TextType = QuestionType.Text

  exam: Exam
  student: ExamResult
  email: string

  studentRef: Observable<ExamResult>

  questions: Question[]
  questionsMap: { [key: string]: ActiveQuestion } = {}
  questionNumber = 0
  current: ActiveQuestion

  working: boolean
  examFinished: boolean
  answering: boolean

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private examsService: ExamsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as { exam: Exam, student: ExamResult }
    if (state && state.exam && state.student) {
      this.exam = state.exam
      this.student = state.student
      this.init()
    } else {
      this.route.params.subscribe(params => {
        this.getData(params.id)
      })
    }
  }

  private async getData(id: string) {
    this.working = true
    const examDoc = await this.examsService.get(id).get().toPromise()
    this.exam = {
      id: examDoc.id,
      ... examDoc.data()
    } as Exam

    this.student = await this.examsService.prepareExamQuestions(this.exam.id, this.exam.test.id).toPromise()
    if (!this.student) {
      this.exam = {} as Exam
      this.working = false
      return
    }
    this.init()
  }

  ngOnInit() {
    this.menuService.menu({})
  }

  private async init() {
    this.authService.user.subscribe(async user => {
      try {
        this.email = user.email.toLowerCase()
        if (!this.exam.emails || this.exam.emails.indexOf(this.email) < 0) {
          this.exam = {} as Exam
          return
        }

        // check if exam marked as finished or not valid by date
        if (this.exam.finished || this.exam.validUntil && this.exam.validUntil < firebase.firestore.Timestamp.now()) {
          this.examFinished = true
          return
        }
        if (this.student.finished || this.student.validUntil &&
              this.student.validUntil._seconds < firebase.firestore.Timestamp.now().seconds) {
          this.examFinished = true
          return
        }

        this.studentRef = this.examsService.getExamStudent(this.exam.id, this.email).valueChanges()

        // read test questions
        this.questions = await this.examsService.getExamStudentQuestions(this.exam.id, this.exam.test.id).toPromise()
        if (this.questions && this.questions.length > 0) {
          this.questions.forEach(q => this.questionsMap[q.id] = { question: q })
        }

        // prepare existed answers
        if (this.student.questionsIds) {
          this.student.questionsIds.forEach(q => {
            const activeQuestion = this.questionsMap[q.id]
            if (activeQuestion && q.result && Array.isArray(q.result.student)) {
              activeQuestion.done = true
              if (activeQuestion.question.type === QuestionType.Check) {
                activeQuestion.answer = q.result.student.filter(a => a.answer > '').map(a => a.answer)
                activeQuestion.answerSaved = activeQuestion.answer.slice()
              } else {
                activeQuestion.answer = q.result.student[0] ? q.result.student[0].answer : undefined
                activeQuestion.answerSaved = activeQuestion.answer
              }
            }
          })
        }

      } catch (error) {
        console.error(error)
        return

      } finally {
        this.working = false
      }

      // if everything ok - start exam
      this.startQuestions()
    })
  }

  private startQuestions() {
    if (this.examFinished ||
      !this.student ||
      !this.questions || this.questions.length === 0) { return }

    const qid = this.student.questionsIds[this.questionNumber].id
    this.current = this.questionsMap[qid]
  }

  nextQuestion() {
    if (++this.questionNumber >= this.questions.length) { this.questionNumber = 0 }
    this.startQuestions()
  }

  prevQuestion() {
    if (--this.questionNumber < 0) { this.questionNumber = this.questions.length - 1 }
    this.startQuestions()
  }

  hasNewAnswers(): boolean {
    if (this.current.question.type === QuestionType.Check) {

      const answers = Array.isArray(this.current.answer) ? this.current.answer.filter(a => a > '') : []
      if (answers.length === 0) { return false }

      const saved = Array.isArray(this.current.answerSaved) ? this.current.answerSaved.filter(a => a > '') : []
      if (answers.length !== saved.length) { return true }

      for (const a of answers) {
        if (!saved.includes(a)) { return true }
      }
      return false

    } else {
      return this.current.answer > '' && this.current.answer !== this.current.answerSaved
    }
  }

  hasNoNewAnswers(): boolean {
    return !this.hasNewAnswers()
  }

  onChange(answer: string) {
    if (!Array.isArray(this.current.answer)) {
      this.current.answer = []
    }
    const index = this.current.answer.indexOf(answer)
    if (index < 0) {
      this.current.answer.push(answer)
    } else {
      this.current.answer.splice(index, 1)
    }
  }

  cancel() {
    this.current.answer = Array.isArray(this.current.answerSaved) ? this.current.answerSaved.slice() : this.current.answerSaved
  }

  async done() {
    this.answering = true
    try {
      this.current.done = true

      this.examsService.regStudentAnswer({
        exam: this.exam.id,
        test: this.exam.test.id,
        question: this.current.question.id,
        type: this.current.question.type,
        answer: this.current.answer
      }).toPromise()

      this.current.answerSaved = Array.isArray(this.current.answer) ? this.current.answer.slice() : this.current.answer
      this.nextQuestion()

    } finally {
      this.answering = false
    }
  }

  finishTest() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { question: 'Are you sure you want to finish your exam/test?' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.finishing()
      }
    })
  }

  private async finishing() {
    this.working = true

    try {
      await this.examsService.examFinish({
        exam: this.exam.id,
        test: this.exam.test.id
      }).toPromise()
      this.examFinished = true
      this.goExamResult()

    } finally {
      this.working = false
    }
  }

  goExamResult() {
    this.router.navigate(['student', 'exam', this.exam.id, 'result'], {
      state: { exam: this.exam },
    })
  }

}
