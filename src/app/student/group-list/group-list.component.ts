import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import * as firebase from 'firebase/app'

import { MenuService } from '@app/core/services/menu.service'
import { GroupsService } from '@app/core/models/services/groups.service'
import { Group } from '@app/core/models/data/group'
import { AuthService } from '@app/core/services/auth.service'

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups: Observable<Group[]>

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.menu({})
    this.groups = this.authService.user.pipe(
      switchMap(user => {
        return this.groupsService
          .list(ref => ref.where('emails', 'array-contains', user.email.toLowerCase()))
          .snapshotChanges()
          .pipe(
            map(a => a
              .filter(e => (e.payload.doc.data() as Group).end >= firebase.firestore.Timestamp.now())
              .map(e => {
                return {
                  id: e.payload.doc.id,
                  ...e.payload.doc.data()
                } as Group
              })
            )
          )
      })
    )
  }

}
