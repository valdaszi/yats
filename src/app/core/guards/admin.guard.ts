import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'

import { AuthService } from '../services/auth.service'
import { Logger } from '../services/logger.service'

const log = new Logger('AdminGuard')

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    return this.canLoad()
  }

  canLoad(): boolean {
    const isAdmin = this.authService.isAdmin()
    if (!isAdmin) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}
