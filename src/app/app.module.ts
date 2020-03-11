import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireFunctionsModule, FUNCTIONS_REGION } from '@angular/fire/functions'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutModule } from '@angular/cdk/layout'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatNativeDateModule } from '@angular/material'

import { AppComponent } from './app.component'
import { CoreModule } from '@app/core/core.module'
import { LoginModule } from './login/login.module'
import { AdminModule } from './admin/admin.module'
import { TeacherModule } from './teacher/teacher.module'
import { StudentModule } from './student/student.module'

import { AppRoutingModule } from './app.routing'

import { TranslateModule } from '@ngx-translate/core'
import { MarkdownModule } from 'ngx-markdown'

import { environment } from '@environments/environment'
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // angular material:
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,

    TranslateModule.forRoot(),
    MarkdownModule.forRoot(),

    // my modules:
    CoreModule,
    LoginModule,
    AdminModule,
    TeacherModule,
    StudentModule,

    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, DashboardComponent],
  providers: [
    { provide: FUNCTIONS_REGION, useValue: 'europe-west1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
