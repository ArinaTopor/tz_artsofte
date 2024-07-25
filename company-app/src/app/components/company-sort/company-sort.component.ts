import { Component, EventEmitter, Output } from '@angular/core';
import { SortValue, SortValues } from '../../models/sort-values';

@Component({
  selector: 'company-sort',
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss',
})
export class CompanySortComponent {
  @Output() sortEvent = new EventEmitter<string>();
  public sortOptions: SortValue[];
  constructor() {
    this.sortOptions = SortValues;
  }

  public handleChangeSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortEvent.emit(selectElement.value);
  }
}
