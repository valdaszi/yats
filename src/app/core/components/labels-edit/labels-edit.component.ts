import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith, switchMap } from 'rxjs/operators'

import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'

import { ConfigService } from '@app/core/services/config.service'

@Component({
  selector: 'app-labels-edit',
  templateUrl: './labels-edit.component.html',
  styleUrls: ['./labels-edit.component.scss']
})
export class LabelsEditComponent implements OnInit {

  @Input() model: { labels: string[] }

  labels: Observable<string[]>

  @ViewChild('labelsInput', {static: false}) labelsInput: ElementRef<HTMLInputElement>
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete

  separatorKeysCodes: number[] = [ENTER, COMMA]
  labelsCtrl = new FormControl()
  filteredLabels: Observable<string[]>

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.labels = this.configService.config.pipe(map(c => c.labels))
    this.filteredLabels = this.labelsCtrl.valueChanges
      .pipe(
        startWith(null),
        switchMap(label => label ? this.filter(label) : this.labels)
      )
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.model.labels = this.model.labels || []

    const label = event.option.viewValue
    const index = this.model.labels.indexOf(label)
    if (index < 0) {
      this.model.labels.push(label)
    }

    this.labelsInput.nativeElement.value = ''
    this.labelsCtrl.setValue(null)
  }

  addLabel(event: MatChipInputEvent): void {
    // Add label only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (this.matAutocomplete.isOpen) { return }

    this.model.labels = this.model.labels || []

    const input = event.input
    const value = event.value

    // Add label only if it not in the list already
    if ((value || '').trim()) {
      const label = value.trim()
      const index = this.model.labels.indexOf(label)
      if (index < 0) {
        this.model.labels.push(value.trim())
      }
    }

    // Reset the input value
    if (input) {
      input.value = ''
    }

    this.labelsCtrl.setValue(null)
  }

  removeLabel(label: string): void {
    const index = this.model.labels.indexOf(label)
    if (index >= 0) {
      this.model.labels.splice(index, 1)
    }
  }

  private filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase()
    return this.labels
      .pipe(
        map(e => e.filter(label => label.toLowerCase().indexOf(filterValue) === 0))
      )
  }


}
