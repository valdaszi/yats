import { Component, OnInit } from '@angular/core'

import { MenuService } from '@app/core/services/menu.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.menu({
      topMenu: [
        { label: 'Admin', route: ['admin'] },
        { label: 'Teacher', route: ['teacher'] },
        { label: 'Student', route: ['student'] }
      ]
    })
  }

}
