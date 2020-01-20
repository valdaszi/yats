import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'

import { AuthService } from '../services/auth.service'
import { Logger } from '../services/logger.service'

const log = new Logger('StudentGuard')

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    return this.canLoad()
  }

  canLoad(): boolean {
    const isStudent = this.authService.isStudent()
    if (!isStudent) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}
