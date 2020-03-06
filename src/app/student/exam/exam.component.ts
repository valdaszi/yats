import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { take, map } from 'rxjs/operators'

import { MatDialog } from '@angular/material/dialog'

import * as firebase from 'firebase/app'

import { DialogConfirmationComponent } from '@app/core/components/dialog-confirmation/dialog-confirmation.component'
import { MenuService } from '@app/core/services/menu.service'
import { Exam, ExamResult, GroupExam } from '@app/core/models/data'
import { ExamsService } from '@app/core/models/services/exams.service'
import { AuthService } from '@app/core/services/auth.service'

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  exam: Exam
  student: ExamResult
  email: string

  working = true
  examFreshStart: boolean
  examContinuation: boolean
  examFinished: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examsService: ExamsService,
    private menuService: MenuService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.route.params.subscribe(params => {
      this.examsService.get(params.id).valueChanges().pipe(take(1)).subscribe(model => {
        if (params.id) {
          model.id = params.id
        }
        this.initExam(model)
      })
    })
  }

  ngOnInit() {
    this.menuService.menu({})
  }

  private async initExam(m: Exam) {
    this.authService.user.subscribe(async user => {
      try {
        this.email = user.email.toLowerCase()
        if (!m.emails || m.emails.indexOf(this.email) < 0) {
          this.exam = {} as Exam
          return
        }

        this.exam = Object.assign({}, m)

        // check if exam marked as finished or not valid by date
        if (this.exam.finished || this.exam.validUntil && this.exam.validUntil < firebase.firestore.Timestamp.now()) {
          return
        }

        this.examFreshStart = false
        this.examContinuation = false

        this.student = await this.examsService.prepareExamQuestions(m.id, m.test.id).toPromise()
        if (!this.student) { return }

        if (this.student.finished || this.student.validUntil &&
              this.student.validUntil._seconds < firebase.firestore.Timestamp.now().seconds) {
          this.examFinished = true
          return
        }

        if (this.student.startedAt) {
          this.examContinuation = true
        } else {
          this.examFreshStart = true
        }

      } catch (error) {
        // do nothing
      } finally {
        this.working = false
      }
    })
  }

  start() {
    if (this.examFreshStart) {
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: { question: 'Are you sure you want to start?' }
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.starting()
        }
      })
    } else if (this.examContinuation) {
      this.starting()
    }
  }

  private async starting() {
    if (this.examFreshStart) {
      await this.examsService.startExam(this.exam.id, this.email, this.exam.test.duration)
    }
    this.router.navigate(['question'], {
      state: {
        exam: this.exam,
        student: this.student
      },
      relativeTo: this.route
    })
  }

  result() {
    this.router.navigate(['result'], {
      relativeTo: this.route
    })
  }

}
