import { Component, OnInit } from '@angular/core'

import { MenuService } from '@app/core/services/menu.service'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.menu({})
  }

}
