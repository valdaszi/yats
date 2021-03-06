import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { take, map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { MatDialog } from '@angular/material/dialog'

import { MenuService } from '@app/core/services/menu.service'
import { TestsService } from '@app/core/models/services/tests.service'
import { Test, Question } from '@app/core/models/data'
import { DialogConfirmationComponent } from '@app/core/components/dialog-confirmation/dialog-confirmation.component'

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  test: Test
  questions: Observable<Question[]>

  constructor(
    private testsService: TestsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private menuService: MenuService
  ) {
    const navigation = this.router.getCurrentNavigation()
    if (!navigation || !navigation.extras) { return }
    const state = navigation.extras.state as { model: Test }
    if (state && state.model) {
      this.test = Object.assign({}, state.model)
      this.getQuestions(this.test.id)
    } else {
      this.route.params.subscribe(params => {
        this.testsService.get(params.id).valueChanges().pipe(take(1)).subscribe(model => {
          this.test = Object.assign({}, model)
          if (params.id) {
            this.test.id = params.id
          }
          this.getQuestions(this.test.id)
        })
      })
    }
  }

  ngOnInit() {
    this.menuService.menu({})
  }

  private getQuestions(testId: string) {
    this.questions = this.testsService.listQuestions(testId).snapshotChanges()
      .pipe(
        map(questions => questions
          .map(q => {
            return {
              id: q.payload.doc.id,
              ...q.payload.doc.data()
            } as Question
          })
        )
      )
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase()
  // }

  select(question: Question) {
    this.router.navigate(['question', question.id], {
      state: {
        question,
        test: this.test
      },
      relativeTo: this.route
    })
  }

  edit(question: Question, event: Event) {
    event.stopPropagation()
    this.router.navigate(['question', question.id, 'edit'], {
      state: { question },
      relativeTo: this.route
    })
  }

  add() {
    this.router.navigate(['question', 'add'], {
      relativeTo: this.route
    })
  }

  delete(question: Question, event: Event) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { question: 'Are you sure you want to delete this item?' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.testsService.deleteQuestion(this.test.id, question.id)
      }
    })
  }

}
