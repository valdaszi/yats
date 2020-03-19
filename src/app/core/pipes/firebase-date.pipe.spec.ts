import { FirebaseDatePipe } from './firebase-date.pipe'
import { registerLocaleData } from '@angular/common'
import localeLt from '@angular/common/locales/lt'

describe('FirebaseDatePipe', () => {
  it('create an instance', () => {
    const d = new Date(2020, 1, 28) // 2020-02-28
    registerLocaleData(localeLt)
    const pipe = new FirebaseDatePipe('lt')
    expect(pipe.transform(d)).toBe('2020-02-28')
  })
})
