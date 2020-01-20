import { Component, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'

import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'

import { MenuService } from '@app/core/services/menu.service'
import { TeachersService } from '@app/core/models/services/teachers.service'
import { Teacher } from '@app/core/models/data/teacher'
import { DialogConfirmComponent } from '@app/core/components/dialog-confirm/dialog-confirm.component'

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator

  teachers: Teacher[]
  dataSource: MatTableDataSource<Teacher>
  displayedColumns: string[] = ['position', 'email', 'name', 'actions']

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teachersService: TeachersService,
    private menuService: MenuService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.menuService.menu({})
    this.teachersService.list()
      .snapshotChanges()
      .pipe(
        map(a => a
          .filter(e => (e.payload.doc.data() as Teacher).active)
          .map(e => e.payload.doc.data())
        )
      )
      .subscribe(model => {
        this.dataSource = new MatTableDataSource<Teacher>(model)
        this.dataSource.paginator = this.paginator
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  add() {
    this.router.navigate(['teacher', 'add'], {
      relativeTo: this.route
    })
  }

  delete(teacher: Teacher, event: Event) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { question: 'Are you sure you want to delete this item?' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teachersService.delete(teacher.email)
      }
    })
  }

}
