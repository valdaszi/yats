import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { MenuService } from '@app/core/services/menu.service'
import { ExamsService } from '@app/core/models/services/exams.service'
import { AuthService } from '@app/core/services/auth.service'
import { Exam, ExamResult, Question } from '@app/core/models/data'


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

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

      } catch (error) {
        return

      } finally {
        this.working = false
      }
    })
  }

}
