import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatMenuModule } from '@angular/material/menu'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatChipsModule } from '@angular/material/chips'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'

import { NavComponent } from './components/nav/nav.component'
import { MessagesComponent } from './components/messages/messages.component'
import { LabelComponent } from './components/label/label.component'
import { TruncatePipe } from './pipes/truncate.pipe'
import { TestLabelComponent } from './components/test-label/test-label.component'
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component'
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LabelsEditComponent } from './components/labels-edit/labels-edit.component';
import { FirebaseDatePipe } from './pipes/firebase-date.pipe';
import { TestLookupComponent } from './components/test-lookup/test-lookup.component'


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    RouterModule,

    // angular material:
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    NavComponent,
    MessagesComponent,
    LabelComponent,
    TruncatePipe,
    TestLabelComponent,
    DialogConfirmComponent,
    BreadcrumbComponent,
    LabelsEditComponent,
    FirebaseDatePipe,
    TestLookupComponent
  ],
  entryComponents: [
    DialogConfirmComponent
  ],
  exports: [
    NavComponent,
    MessagesComponent,
    LabelComponent,
    TruncatePipe,
    TestLabelComponent,
    DialogConfirmComponent,
    BreadcrumbComponent,
    LabelsEditComponent,
    FirebaseDatePipe,
    TestLookupComponent
  ],
  providers: []
})
export class CoreModule {}
