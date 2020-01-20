import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { LayoutModule } from '@angular/cdk/layout'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatProgressBarModule } from '@angular/material/progress-bar'

import { MarkdownModule } from 'ngx-markdown'

import { CoreModule } from '@app/core/core.module'

import { TeacherRoutingModule } from './teacher.routing'
import { TestsListComponent } from './tests-list/tests-list.component'
import { TestEditComponent } from './test-edit/test-edit.component'
import { QuestionsListComponent } from './questions-list/questions-list.component'
import { QuestionEditComponent } from './question-edit/question-edit.component'
import { QuestionComponent } from './question/question.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { GroupsListComponent } from './groups-list/groups-list.component'
import { GroupEditComponent } from './group-edit/group-edit.component'
import { TestAssignComponent } from './test-assign/test-assign.component'
import { GroupAssignTestComponent } from './group-assign-test/group-assign-test.component'
import { ExamStatusComponent } from './exam-status/exam-status.component'
import { ExamReviewComponent } from './exam-review/exam-review.component'


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule.forChild(),
    MarkdownModule.forChild(),

    // angular material:
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatProgressBarModule,

    CoreModule,

    TeacherRoutingModule,
  ],
  declarations: [
    TestsListComponent,
    TestEditComponent,
    QuestionsListComponent,
    QuestionEditComponent,
    QuestionComponent,
    DashboardComponent,
    GroupsListComponent,
    GroupEditComponent,
    TestAssignComponent,
    GroupAssignTestComponent,
    ExamStatusComponent,
    ExamReviewComponent,
  ]
})
export class TeacherModule { }
