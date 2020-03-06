import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { MatDialog } from '@angular/material/dialog'

import { MenuService } from '@app/core/services/menu.service'
import { ExamResult } from '@app/core/models/data'
import { ExamsService } from '@app/core/models/services/exams.service'
import { DialogConfirmationComponent } from '@app/core/components/dialog-confirmation/dialog-confirmation.component'

@Component({
  selector: 'app-exam-status',
  templateUrl: './exam-status.component.html',
  styleUrls: ['./exam-status.component.scss']
})
export class ExamStatusComponent implements OnInit {

  examResults: Observable<ExamResult[]>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examsService: ExamsService,
    private menuService: MenuService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.examResults = this.examsService.listExamResult(params.id)
        .snapshotChanges()
        .pipe(
          map(a => a
            .map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as ExamResult
            })
          )
        )
    })
   }

  ngOnInit() {
    this.menuService.menu({})
  }

  percent(a, b) {
    if (b && a) {
      return Math.round(a / b * 100) + '%'
    }
  }

  review(student: ExamResult) {
    this.router.navigate(['review', student.email], {
      state: { student },
      relativeTo: this.route
    })
  }

  finish(student: ExamResult, event: Event) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { question: 'Are you sure you want to finish exam/test?' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.finishing(student)
      }
    })
  }

  private async finishing(student: ExamResult) {
    try {
      await this.examsService.examFinish({
        student: student.email,
        exam: student.examId,
        test: student.testId
      }).toPromise()
    } finally {
    }
  }

}
