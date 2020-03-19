import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { MenuService, Menu } from '@app/core/services/menu.service'
import { AuthService } from '@app/core/services/auth.service'
import { Logger } from '@app/core'

const log = new Logger('DashboardComponent')

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.user
      .subscribe(user => {
        const menu: Menu = { topMenu: [] }
        if (user && user.roles) {
          if (user.roles.admin) { menu.topMenu.push({ label: 'Admin', route: ['admin'] }) }
          if (user.roles.teacher) { menu.topMenu.push({ label: 'Teacher', route: ['teacher'] }) }
          if (user.roles.student) { menu.topMenu.push({ label: 'Student', route: ['student'] }) }
        }
        this.menuService.menu(menu)
      })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }

}
