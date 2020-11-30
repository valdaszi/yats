import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@app/core/services/auth.service'
import { MenuService } from '@app/core/services/menu.service'

// import * as firebaseui from 'firebaseui'
// import { auth } from 'firebase/app'
// import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // loginForm: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.menu({ title: '', hideAuth: true })
    // this.loginForm = this.formBuilder.group({
    //   username: [''],
    //   password: ['']
    // });
  }

  ngOnDestroy() { }

  // get f() { return this.loginForm.controls }

  // login() {
  //   this.authService.login(this.f.username.value, this.f.password.value);
  // }

  authGithub() {
    this.authService.authGithub()
  }

  authGoogle() {
    this.authService.authGoogle()
  }

  authMicrosoft() {
    this.authService.authMicrosoft()
  }
}

// export class LoginComponent implements OnInit, OnDestroy {

//   private ui: firebaseui.auth.AuthUI

//   constructor(
//     private afAuth: AngularFireAuth,
//     private menuService: MenuService,
//     private authService: AuthService,
//   ) { }

//   ngOnInit() {
//     this.menuService.menu({ title: '', hideAuth: true })
//     const uiConfig = {
//       signInOptions: [
//         auth.GoogleAuthProvider.PROVIDER_ID,
//         auth.GithubAuthProvider.PROVIDER_ID,
//         // auth.EmailAuthProvider.PROVIDER_ID,
//       ],
//       callbacks: {
//         signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
//       }
//     }
//     this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth)
//     this.ui.start('#firebaseui-auth-container', uiConfig)
//   }

//   ngOnDestroy() {
//     this.ui.delete()
//   }

//   onLoginSuccessful(userCredential: auth.UserCredential) {
//     console.log('Firebase UI result:', userCredential)
//     this.authService.go(userCredential, userCredential.additionalUserInfo.isNewUser ? 3 : 1)
//   }
// }
