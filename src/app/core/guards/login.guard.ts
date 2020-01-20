import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

import { Logger } from '../services/logger.service'

const log = new Logger('LoginGuard')

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    log.debug('isLoggedIn: ' + this.authService.isLoggedIn)
    if (this.authService.isLoggedIn) {
      this.authService.logout()
      return false
    }
    return true
  }
}
