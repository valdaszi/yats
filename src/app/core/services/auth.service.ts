import { Injectable, NgZone } from '@angular/core'

import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { Observable, from, of, EMPTY } from 'rxjs'
import { map, flatMap } from 'rxjs/operators'

import { User } from '@app/core/models/data/user'
import { Logger } from './logger.service'

const log = new Logger('AuthService')

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<User>
  public currentUser: User

  constructor(
    // private dbService: DBService,
    private afAuth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    // load last saved user info from local storage, because firebase authentication take a time
    const u = localStorage.getItem('currentUser')
    this.currentUser = u !== null ? JSON.parse(u) : null

    this.user = afAuth.authState.pipe(
      flatMap(user => {
        if (!user || !user.emailVerified) {
          return EMPTY
        } else {
          return this.getUserRoles(user)
        }
      })
    )
  }

  private getUserIdTokenResult(user: firebase.User, forceRefresh?: boolean): Promise<User> {
    return user.getIdTokenResult(forceRefresh).then(idTokenResult => {
      this.currentUser = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: {
          admin: idTokenResult.claims.admin,
          teacher: idTokenResult.claims.teacher,
          student: idTokenResult.claims.student
        }
      }
      const body = document.querySelector('body')
      if (this.currentUser.roles.student) {
        body.onmousedown = body.onselectstart = () => false
      } else {
        body.onmousedown = body.onselectstart = undefined
      }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      log.debug(JSON.stringify(this.currentUser))
      return this.currentUser
    })
  }

  private getUserRoles(user: firebase.User): Observable<User> {
    return user ? from(this.getUserIdTokenResult(user)) : EMPTY
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.admin === true
  }

  isTeacher(): boolean {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.teacher === true
  }

  isStudent(): boolean {
    return this.currentUser && this.currentUser.roles && this.currentUser.roles.student === true
  }

  refreshToken() {
    const user = this.afAuth.auth.currentUser
    if (user) {
      this.getUserIdTokenResult(user, true)
    }
  }

  // async login(email: string, password: string) {
  //   try {
  //     await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  //     this.router.navigate(['/admin/dashboard']);
  //   } catch (e) {
  //     log.error('Error! ' + e.message);
  //     this.router.navigate(['/login']);
  //   }
  // }

  login() {
    this.router.navigate(['/login'])
  }

  async logout() {
    this.currentUser = null
    localStorage.removeItem('currentUser')
    await this.afAuth.auth.signOut()
    this.router.navigate(['/login'])
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser
  }

  get displayName(): string {
    return this.currentUser && this.currentUser.displayName || ''
  }

  // authGithub() {
  //   return this.authLogin(new auth.GithubAuthProvider())
  // }

  // authGoogle() {
  //   return this.authLogin(new auth.GoogleAuthProvider())
  // }

  // // Auth logic to run auth providers
  // async authLogin(provider: firebase.auth.AuthProvider) {
  //   try {
  //     const userCredential = await this.afAuth.auth.signInWithPopup(provider)
  //     await this.go(userCredential, userCredential.additionalUserInfo.isNewUser ? 3 : 1)
  //     log.info(userCredential.user)
  //   } catch (e) {
  //     log.error('Error! ' + e.message)
  //   }
  // }

  async go(userCredential: auth.UserCredential, retryCount: number, timeout: number = 2000) {
    const user = await this.getUserIdTokenResult(userCredential.user, userCredential.additionalUserInfo.isNewUser)
    if (user.roles.admin === true) {
      this.ngZone.run(() => this.router.navigate(['/admin']))
    } else if (user.roles.teacher === true) {
      this.ngZone.run(() => this.router.navigate(['/teacher']))
    } else if (user.roles.student === true) {
      this.ngZone.run(() => this.router.navigate(['/student']))
    } else {
      if (retryCount <= 0) { return }
      log.debug('retrying after ' + timeout + 'ms')
      setTimeout(() => this.go(userCredential, --retryCount, timeout + 1000), timeout)
    }
  }
}
