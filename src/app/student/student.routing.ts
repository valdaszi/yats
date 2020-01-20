import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { StudentGuard } from '@app/core/guards/student.guard'

import { DashboardComponent } from './dashboard/dashboard.component'
import { GroupListComponent } from './group-list/group-list.component'
import { GroupComponent } from './group/group.component'
import { ExamComponent } from './exam/exam.component'
import { QuestionComponent } from './question/question.component'
import { ResultComponent } from './result/result.component'


const routes: Routes = [
  {
    path: 'student',
    data: {
      breadcrumb: 'Student'
    },
    children: [
      { path: '', component: DashboardComponent, canActivate: [StudentGuard], canLoad: [StudentGuard] },
      {
        path: 'group',
        data: {
          breadcrumb: 'Students Groups'
        },
        children: [
          { path: '', component: GroupListComponent, canActivate: [StudentGuard], canLoad: [StudentGuard] },
          {
            path: ':id',
            data: {
              breadcrumb: 'Group'
            },
            children: [
              { path: '', component: GroupComponent, canActivate: [StudentGuard], canLoad: [StudentGuard] }
            ]
          },
        ]
      },
      {
        path: 'exam/:id',
        data: {
          breadcrumb: 'Exam'
        },
        children: [
          { path: '', component: ExamComponent, canActivate: [StudentGuard], canLoad: [StudentGuard] },
          {
            path: 'question', component: QuestionComponent, canActivate: [StudentGuard], canLoad: [StudentGuard],
            data: {
              breadcrumb: 'Question'
            },
          },
          {
            path: 'result', component: ResultComponent, canActivate: [StudentGuard], canLoad: [StudentGuard],
            data: {
              breadcrumb: 'Result'
            },
          },
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StudentRoutingModule { }
