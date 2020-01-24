import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

import { QueryDocumentSnapshot } from '@angular/fire/firestore'
import * as firebase from 'firebase/app'

import { MatDialog } from '@angular/material/dialog'

import { MenuService } from '@app/core/services/menu.service'
import { GroupsService } from '@app/core/models/services/groups.service'
import { ExamsService } from '@app/core/models/services/exams.service'
import { Group, GroupExam } from '@app/core/models/data/group'
import { DialogConfirmComponent } from '@app/core/components/dialog-confirm/dialog-confirm.component'


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit, OnDestroy {

  groups: Group[]
  model = {} as Group
  groupSubscription: Subscription

  readonly pageSize = 10

  firstVisibleDocRef: QueryDocumentSnapshot<Group>
  lastVisibleDocRef: QueryDocumentSnapshot<Group>
  first: boolean
  last: boolean
  starting = true

  showAll: boolean

  constructor(
    private groupsService: GroupsService,
    private examsService: ExamsService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.menuService.menu({})
    this.query()
  }

  ngOnDestroy() {
    this.unsubscribe()
  }

  private init() {
    this.groups = []
    this.starting = true
    this.first = false
    this.last = false
    this.firstVisibleDocRef = undefined
    this.lastVisibleDocRef = undefined
  }

  private unsubscribe() {
    if (this.groupSubscription) {
      this.groupSubscription.unsubscribe()
    }
  }


  //          x x x | x x x | x x x
  //  next            x x x   x
  //  prev        x   x x x
  private query(back?: boolean) {
    this.unsubscribe()
    this.groupSubscription = this.groupsService
      .list(ref => {
        let query = this.showAll ? ref : ref.where('end', '>=', firebase.firestore.Timestamp.now())
        query = query.orderBy('end', 'desc')
        if (!back) {
          query = query.limit(this.pageSize + 1)
          if (this.lastVisibleDocRef) {
            query = query.startAfter(this.lastVisibleDocRef)
          }
        } else {
          if (this.firstVisibleDocRef) {
            query = query.limitToLast(this.pageSize + 1).endBefore(this.firstVisibleDocRef)
          }
        }
        return query
      })
      .snapshotChanges()
      .subscribe(data => {

        if (!data || data.length === 0) { return }

        if (!back) {
          this.firstVisibleDocRef = data[0].payload.doc
          this.lastVisibleDocRef = data.length > this.pageSize ? data[this.pageSize - 1].payload.doc : undefined

          if (this.starting) {
            this.starting = false
            this.first = true
          } else {
            this.first = false
          }
          this.last = data.length <= this.pageSize

        } else {
          this.firstVisibleDocRef = data.length > this.pageSize ? data[1].payload.doc : undefined
          this.lastVisibleDocRef = data[data.length - 1].payload.doc

          this.first = data.length <= this.pageSize
          this.last = false
        }

        const groups = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Group
        })

        this.groups = back ? groups.slice(-this.pageSize) : groups.slice(0, this.pageSize)
      })
  }

  onPrevious() {
    this.query(true)
  }

  onNext() {
    this.query()
  }

  edit(model: Group) {
    this.router.navigate([model.id, 'edit'], {
      state: { model },
      relativeTo: this.route
    })
  }

  add() {
    this.router.navigate(['add'], {
      relativeTo: this.route
    })
  }

  assign(group: Group) {
    this.router.navigate([group.id, 'assign'], {
      state: { group },
      relativeTo: this.route
    })
  }

  showOption() {
    this.init()
    this.query()
  }

  deleteExam(group: Group, index: number, event: Event) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { question: 'Are you sure you want to delete this item?' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const exam = group.exams[index]
        group.exams.splice(index, 1)
        this.examsService.delete(exam.id)
      }
    })
  }

  goExam(exam: GroupExam) {
    this.router.navigate(['teacher', 'exam', exam.id])
  }

}
