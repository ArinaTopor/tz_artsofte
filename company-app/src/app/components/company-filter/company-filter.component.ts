import {
  Component,
  DestroyRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompaniesService } from '../../services/companies.service';
import { FilterData, FilterForm } from '../../models/filter-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'company-filter',
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss',
})
export class CompanyFilter {
  @Output() filterEvent = new EventEmitter<FilterData>();
  public types: Observable<string[]>;
  public industries: Observable<string[]>;
  protected filterForm = new FormGroup<FilterForm>({
    textBox: new FormControl('', { nonNullable: true }),
    selectBoxType: new FormControl('', { nonNullable: true }),
    selectBoxIndustry: new FormControl('', { nonNullable: true }),
  });
  constructor(
    companyService: CompaniesService,
    private _destroyRef: DestroyRef
  ) {
    this.types = companyService.getTypes();
    this.industries = companyService.getIndustries();
    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(_destroyRef))
      .subscribe((data) => this.filterEvent.emit(data));
  }
}
