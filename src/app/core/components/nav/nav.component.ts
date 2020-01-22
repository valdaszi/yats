import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { MenuService, Menu } from '@app/core/services/menu.service'
import { AuthService } from '@app/core/services/auth.service'
import { Logger } from '@app/core'

const log = new Logger('NavComponent')

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean
  isAdmin: boolean
  isTeacher: boolean
  componentMenu: Menu = { title: '', hideAuth: false, topMenu: [] }
  isSmall: boolean
  displayName: string
  photoURL: string

  private menuSubscription: Subscription
  private authSubscription: Subscription

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuSubscription = this.menuService.menuObservable
      .subscribe(menu => {
        log.debug(`menu: ${JSON.stringify(menu)}`)
        this.componentMenu = menu
      })
    this.authSubscription = this.authService.user
      .subscribe(user => {
        log.debug(`user: ${JSON.stringify(user)}`)
        if (!user || !user.roles) {
          this.isLoggedIn = false
          this.isAdmin = false
          this.isTeacher = false
          return
        }
        this.isLoggedIn = true
        this.displayName = user.displayName
        this.isAdmin = user.roles.admin
        this.isTeacher = user.roles.teacher
        this.photoURL = user.photoURL
      })
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe()
    this.authSubscription.unsubscribe()
  }

  logout() {
    this.authService.logout()
  }

  login() {
    this.authService.login()
  }

  showLogout() {
    return !this.componentMenu.hideAuth && this.isLoggedIn
  }

  showLogin() {
    return !this.componentMenu.hideAuth && !this.isLoggedIn
  }

  profile() {
    // TODO
  }
}
