import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'

import { Teacher, TEACHERS } from '../data'

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private firestore: AngularFirestore) { }

  list() {
    return this.firestore.collection<Teacher>(`${TEACHERS}`, ref => ref.orderBy('email'))
  }

  get(id: string) {
    return this.firestore.doc<Teacher>(`${TEACHERS}/${id}`)
  }

  create(entity: Teacher) {
    return this.firestore.collection<Teacher>(`${TEACHERS}`).add(entity)
  }

  update(entity: Teacher) {
    return this.firestore.doc(`${TEACHERS}/${entity.email}`).update(entity)
  }

  delete(id: string) {
    return this.firestore.doc(`${TEACHERS}/${id}`).delete()
  }
}
