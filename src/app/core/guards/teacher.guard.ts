import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'

import { AuthService } from '../services/auth.service'
import { Logger } from '../services/logger.service'

const log = new Logger('TeacherGuard')

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    return this.canLoad()
  }

  canLoad(): boolean {
    const isTeacher = this.authService.isTeacher()
    if (!isTeacher) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}
