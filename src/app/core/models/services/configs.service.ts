import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'

import { Config, CONFIGS, CONFIGS_GENERAL } from '../data'

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  constructor(private firestore: AngularFirestore) { }

  general() {
    return this.firestore.doc<Config>(`${CONFIGS}/${CONFIGS_GENERAL}`)
  }
}
