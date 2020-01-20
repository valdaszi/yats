import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@app/core/services/auth.service'
import { MenuService } from '@app/core/services/menu.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

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

  get f() { return this.loginForm.controls }

  // login() {
  //   this.authService.login(this.f.username.value, this.f.password.value);
  // }

  authGithub() {
    this.authService.authGithub()
  }

  authGoogle() {
    this.authService.authGoogle()
  }

}
