import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { MenuService } from '@app/core/services/menu.service'
import { ExamsService } from '@app/core/models/services/exams.service'
import { AuthService } from '@app/core/services/auth.service'
import { Exam, ExamResult, Question, QuestionType, AnswerResult } from '@app/core/models/data'

interface ActiveQuestion {
  question: Question,
  // answer?: string | string[]
  done?: boolean
  result?: AnswerResult
  answers: Result[]
}

interface Result {
  answer: string
  missed: boolean
  wrong: boolean
  correct: boolean
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  CheckType = QuestionType.Check
  RadioType = QuestionType.Radio
  TextType = QuestionType.Text

  exam: Exam
  student: ExamResult
  email: string

  percent: number
  studentPoints: number
  totalPoints: number

  questions: Question[]
  questionsMap: { [key: string]: ActiveQuestion } = {}
  questionNumber = 0
  current: ActiveQuestion

  working: boolean

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private examsService: ExamsService,
    private authService: AuthService,
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

        // read test questions
        this.questions = await this.examsService.getExamStudentQuestions(this.exam.id, this.exam.test.id).toPromise()
        if (this.questions && this.questions.length > 0) {
          this.questions.forEach(q => this.questionsMap[q.id] = { question: q } as ActiveQuestion)
        }

        // prepare existed answers
        this.totalPoints = 0
        this.studentPoints = 0
        if (this.student.questionsIds) {
          this.student.questionsIds.forEach(q => {
            if (q.result) {
              this.totalPoints += q.result.questionPoints || 0
              this.studentPoints += q.result.studentPoints || 0
            }

            const activeQuestion = this.questionsMap[q.id]
            if (activeQuestion && q.result) {
              activeQuestion.done = true
              activeQuestion.result = q.result
              activeQuestion.answers = []

              const studentAnswers: string[] = activeQuestion.result.student ?
                activeQuestion.result.student.map(a => a.answer) : []

              if (activeQuestion.question.type === QuestionType.Text) {
                if (studentAnswers && studentAnswers.length === 1) {
                  if (q.result.correct[0].answer === studentAnswers[0]) {
                    activeQuestion.answers.push({
                      answer: q.result.correct[0].answer,
                      missed: false,
                      wrong: false,
                      correct: true
                    })
                  } else {
                    activeQuestion.answers.push({
                      answer: q.result.correct[0].answer,
                      missed: true,
                      wrong: false,
                      correct: false
                    })
                    activeQuestion.answers.push({
                      answer: studentAnswers[0],
                      missed: false,
                      wrong: true,
                      correct: false
                    })
                  }
                } else {
                  activeQuestion.answers.push({
                    answer: q.result.correct[0].answer,
                    missed: true,
                    wrong: false,
                    correct: false
                  })
                }
              } else {
                q.result.correct.forEach(choice => {
                  const has = studentAnswers.includes(choice.answer)
                  activeQuestion.answers.push({
                    answer: choice.answer,
                    missed: choice.correct && !has, // correct answer and missed
                    wrong: !choice.correct && has,  // wrong answer and selected
                    correct: choice.correct && has  // correct answer and selected
                  })
                })
              }

            }
          })
        }

        this.percent = Math.round(this.studentPoints / this.totalPoints * 100)

      } catch (error) {
        return

      } finally {
        this.working = false
      }

      // if everything ok - start exam
      this.startQuestions()
    })
  }

  private startQuestions() {
    if (!this.student || !this.questions || this.questions.length === 0) { return }

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

}
