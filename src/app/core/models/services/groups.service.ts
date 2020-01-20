import { Injectable } from '@angular/core'
import { AngularFirestore, QueryFn } from '@angular/fire/firestore'

import { Group, GROUPS } from '../data'

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private firestore: AngularFirestore) { }

  list(queryFn?: QueryFn) {
    return this.firestore.collection<Group>(`${GROUPS}`, queryFn ? queryFn : ref => ref.orderBy('name'))
  }

  get(id: string) {
    return this.firestore.doc<Group>(`${GROUPS}/${id}`)
  }

  create(entity: Group) {
    return this.firestore.collection<Group>(`${GROUPS}`).add(entity)
  }

  update(entity: Group) {
    const id = entity.id
    delete entity.id
    return this.firestore.doc(`${GROUPS}/${id}`).update(entity)
  }

  delete(id: string) {
    return this.firestore.doc(`${GROUPS}/${id}`).delete()
  }
}
