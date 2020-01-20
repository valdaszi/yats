import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TeacherGuard } from '@app/core/guards/teacher.guard'

import { DashboardComponent } from './dashboard/dashboard.component'
import { TestsListComponent } from './tests-list/tests-list.component'
import { TestEditComponent } from './test-edit/test-edit.component'
import { TestAssignComponent } from './test-assign/test-assign.component'
import { QuestionsListComponent } from './questions-list/questions-list.component'
import { QuestionEditComponent } from './question-edit/question-edit.component'
import { QuestionComponent } from './question/question.component'
import { GroupsListComponent } from './groups-list/groups-list.component'
import { GroupEditComponent } from './group-edit/group-edit.component'
import { GroupAssignTestComponent } from './group-assign-test/group-assign-test.component'
import { ExamStatusComponent } from './exam-status/exam-status.component'
import { ExamReviewComponent } from './exam-review/exam-review.component'


const routes: Routes = [
  {
    path: 'teacher',
    data: {
      breadcrumb: 'Teacher'
    },
    children: [
      // { path: '', redirectTo: 'test', pathMatch: 'full' },
      { path: '', component: DashboardComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard] },
      {
        path: 'group',
        data: { breadcrumb: 'Students Groups' },
        children: [
          { path: '', component: GroupsListComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard] },
          {
            path: 'add', component: GroupEditComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
            data: { breadcrumb: 'Add' }
          },
          {
            path: ':id/edit', component: GroupEditComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
            data: { breadcrumb: 'Edit' }
          },
          {
            path: ':id/assign', component: GroupAssignTestComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
            data: { breadcrumb: 'Assign' }
          }
        ]
      },
      {
        path: 'test',
        data: { breadcrumb: 'Tests' },
        children: [
          { path: '', component: TestsListComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard] },
          {
            path: 'add', component: TestEditComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
            data: { breadcrumb: 'Add' }
          },
          {
            path: ':id/edit', component: TestEditComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
            data: { breadcrumb: 'Edit' }
          },
          {
            path: ':id/assign', component: TestAssignComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
            data: { breadcrumb: 'Assign' }
          },
          {
            path: ':id',
            data: { breadcrumb: 'Questions' },
            children: [
              { path: '', component: QuestionsListComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard] },
              {
                path: 'question',
                data: { breadcrumb: null },
                children: [
                  {
                    path: ':qid/edit', component: QuestionEditComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
                    data: { breadcrumb: 'Edit' }
                  },
                  {
                    path: 'add', component: QuestionEditComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
                    data: { breadcrumb: 'Add' }
                  },
                  {
                    path: ':qid', component: QuestionComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
                    data: { breadcrumb: 'Question' }
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'exam/:id',
        data: { breadcrumb: 'Exam' },
        children: [
          { path: '', component: ExamStatusComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard] },
          {
            path: 'review/:student', component: ExamReviewComponent, canActivate: [TeacherGuard], canLoad: [TeacherGuard],
            data: { breadcrumb: 'Student' }
          }
        ]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TeacherRoutingModule { }
