import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import * as firebase from 'firebase/app'

import { MenuService } from '@app/core/services/menu.service'
import { Test, Group, Exam } from '@app/core/models/data'
import { GroupsService } from '@app/core/models/services/groups.service'
import { ExamsService } from '@app/core/models/services/exams.service'

@Component({
  selector: 'app-group-assign-test',
  templateUrl: './group-assign-test.component.html',
  styleUrls: ['./group-assign-test.component.scss']
})
export class GroupAssignTestComponent implements OnInit {

  group: Group

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupsService: GroupsService,
    private examsService: ExamsService,
    private menuService: MenuService
  ) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as { group: Group }
    if (state && state.group) {
      this.group = state.group
    } else {
      this.route.params.subscribe(params => {
        this.groupsService.get(params.id).get().subscribe(model => {
          this.group = Object.assign({}, model.data()) as Group
          if (params.id) {
            this.group.id = params.id
          }
        })
      })
    }
   }

  ngOnInit() {
    this.menuService.menu({})
  }

  async onSelected(test: Test) {
    if (!this.group || !this.group.id) {
      // Something wrong - do nothing
      return
    }
    await this.examsService.create({
      group: {
        id: this.group.id,
        name: this.group.name,
        students: this.group.students || null
      },
      test,
      createdOn: new Date()
    } as Exam)

    this.router.navigate(['teacher', 'group'])
  }
}
