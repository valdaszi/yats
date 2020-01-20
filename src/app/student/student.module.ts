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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatRadioModule } from '@angular/material/radio'
import { MatCheckboxModule } from '@angular/material/checkbox'

import { MarkdownModule } from 'ngx-markdown'

import { CoreModule } from '@app/core/core.module'

import { DashboardComponent } from './dashboard/dashboard.component'
import { StudentRoutingModule } from './student.routing'
import { GroupListComponent } from './group-list/group-list.component'
import { GroupComponent } from './group/group.component';
import { ExamComponent } from './exam/exam.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component'


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
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,

    CoreModule,

    StudentRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    GroupListComponent,
    GroupComponent,
    ExamComponent,
    QuestionComponent,
    ResultComponent,
  ]
})
export class StudentModule { }
