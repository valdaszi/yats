import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { take } from 'rxjs/operators'

import * as firebase from 'firebase/app'

import { MenuService } from '@app/core/services/menu.service'
import { Group, Student } from '@app/core/models/data'
import { GroupsService } from '@app/core/models/services/groups.service'

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit, OnDestroy {

  model: Group
  // beginDate = new Date()
  // endDate = new Date()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupsService: GroupsService,
    private menuService: MenuService
  ) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation.extras.state as { model: Group }
    if (state && state.model) {
      this.model = this.initModel(state.model)
    } else {
      this.route.params.subscribe(params => {
        this.groupsService.get(params.id).valueChanges().pipe(take(1)).subscribe(model => {
          this.model = this.initModel(model)
          if (params.id) {
            this.model.id = params.id
          }
        })
      })
    }
  }

  ngOnInit() {
    this.menuService.menu({})
  }

  ngOnDestroy() {
  }

  private initModel(m: Group): Group {
    const model = Object.assign({}, m)
    if (model.start && model.start instanceof firebase.firestore.Timestamp) {
      model.start = model.start.toDate()
    }
    if (model.end && model.end instanceof firebase.firestore.Timestamp) {
      model.end = model.end.toDate()
    }
    model.students = model.students || []
    return model
  }

  private back() {
    this.router.navigate(['/teacher/group'])
  }

  cancel() {
    this.back()
  }

  save() {
    this.model.id ? this.update() : this.create()
  }

  async update() {
    await this.groupsService.update(this.model)
    this.back()
  }

  async create() {
    await this.groupsService.create(this.model)
    this.back()
  }

  deleteStudent(index: number, event: Event) {
    event.stopPropagation()
    this.model.students.splice(index, 1)
  }

  addStudent(event: Event) {
    event.stopPropagation()
    this.model.students.push({} as Student)
  }

}
