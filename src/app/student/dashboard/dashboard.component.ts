import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map, switchMap, filter } from 'rxjs/operators'

import * as firebase from 'firebase/app'

import { MenuService } from '@app/core/services/menu.service'
import { GroupsService } from '@app/core/models/services/groups.service'
import { Group, GroupExam } from '@app/core/models/data/group'
import { AuthService } from '@app/core/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  exams: Observable<GroupExam[]>

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuService.menu({
      topMenu: [
        {
          label: 'Students Groups',
          route: ['student', 'group']
        }
      ]
    })
    this.exams = this.authService.user.pipe(
      switchMap(user => {
        return this.groupsService
          .list(ref => ref.where('emails', 'array-contains', user.email.toLowerCase()))
          .snapshotChanges()
          .pipe(
            map(docs => docs
              .filter(e => (e.payload.doc.data() as Group).end >= firebase.firestore.Timestamp.now())
              .flatMap(e => (e.payload.doc.data() as Group).exams)
              .filter(e => e && !e.finished)
              // .sort((o1, o2) => {
              // TODO - sorting by finished and name
              // })
            )
          )
      })
    )
  }

  go(exam: GroupExam) {
    this.router.navigate(['exam', exam.id], {
      state: { exam },
      relativeTo: this.route
    })
  }

}
