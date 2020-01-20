import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  // Observable menu sources
  private menuTitleSource = new Subject<Menu>()

  // Observable menu streams
  menuObservable = this.menuTitleSource.asObservable()

  constructor() { }

  menu(m: Menu) {
    this.menuTitleSource.next(m)
  }
}

export interface Menu {
  title?: string
  // leftMenu?: MenuItem[]
  topMenu?: MenuItem[]
  hideAuth?: boolean // hide login/logout buttons?
}

export interface MenuItem {
  label: string
  event?: string
  icon?: string
  url?: string
  route?: any[]
}

