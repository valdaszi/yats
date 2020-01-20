import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AdminGuard } from '@app/core/guards/admin.guard'

import { TeacherComponent } from './teacher/teacher.component'


const routes: Routes = [
  { path: 'admin', component: TeacherComponent, canActivate: [AdminGuard], canLoad: [AdminGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
