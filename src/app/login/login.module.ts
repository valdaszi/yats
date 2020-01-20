import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { LoginRoutingModule } from './login.routing'
import { LoginComponent } from './login.component'


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,

    // angular material:
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,

    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
