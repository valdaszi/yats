import { Pipe, PipeTransform } from '@angular/core'
import { DatePipe } from '@angular/common'
import * as firebase from 'firebase/app'

@Pipe({
  name: 'firebaseDate'
})
export class FirebaseDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value instanceof Date) {
      return super.transform(value, ...args)
    }
    if (value instanceof firebase.firestore.Timestamp) {
      return super.transform(value.toDate(), ...args)
    }
    if (value.hasOwnProperty('_seconds')) {
      return super.transform(new firebase.firestore.Timestamp(value._seconds, 0).toDate(), ...args)
    }
    return null
  }

}
