import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { MenuService } from '@app/core/services/menu.service'
import { ExamsService } from '@app/core/models/services/exams.service'
import { AuthService } from '@app/core/services/auth.service'
import { Exam, ExamResult, Question, QuestionType, AnswerResult } from '@app/core/models/data'


@Component({
  selector: 'app-exam-review',
  templateUrl: './exam-review.component.html',
  styleUrls: ['./exam-review.component.scss']
})
export class ExamReviewComponent implements OnInit {

  exam: Exam
  student: ExamResult
  email: string

  questions: Question[]

  working: boolean

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private examsService: ExamsService,
    private authService: AuthService,
  ) {
    const navigation = this.router.getCurrentNavigation()
    if (!navigation || !navigation.extras) { return }
    const state = navigation.extras.state as { student: ExamResult }
    if (state && state.student) {
      this.student = state.student
      this.getData(this.student.examId, this.student.email)
    } else {
      this.route.params.subscribe(params => {
        this.getData(params.id, params.student)
      })
    }
  }

  private async getData(examId: string, studentId: string) {
    this.working = true
    if (!this.exam) {
      const examDoc = await this.examsService.get(examId).get().toPromise()
      this.exam = {
        id: examDoc.id,
        ...examDoc.data()
      } as Exam
    }

    this.student = this.student || await this.examsService.prepareExamQuestions(this.exam.id, this.exam.test.id, studentId).toPromise()
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
    this.authService.user.subscribe(async _ => {
      try {
        // read test questions
        this.questions = await this.examsService.getExamStudentQuestions(this.exam.id, this.exam.test.id, this.student.email).toPromise()

      } catch (error) {
        return

      } finally {
        this.working = false
      }
    })
  }
}
