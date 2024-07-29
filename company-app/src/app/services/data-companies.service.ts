import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FilterData } from '../models/filter-form';
import { CompaniesService } from './companies.service';

@Injectable({ providedIn: 'root' })
export class DataCompaniesService {
  public sortKey: BehaviorSubject<string> = new BehaviorSubject('');
  public filterKeys: BehaviorSubject<FilterData> =
    new BehaviorSubject<FilterData>({
      textBox: '',
      selectBoxIndustry: '',
      selectBoxType: '',
    });

  public transformDataCompanies$: Observable<Company[]>;

  constructor(private _companyService: CompaniesService) {
    this.transformDataCompanies$ = combineLatest([
      this._companyService.companies$,
      this.sortKey,
      this.filterKeys,
    ]).pipe(
      map(([companies, sortKey, filterKeys]) => {
        const filteredData = this.getFilter(companies, filterKeys);
        return this.sortList(filteredData, sortKey);
      })
    );
  }

  public updateSortKey(sortKey: string) {
    this.sortKey.next(sortKey);
  }

  public updateFilterData(filterData: FilterData) {
    this.filterKeys.next(filterData);
  }

  private sortList(companies: Company[], sortKey: string): Company[] {
    if (!sortKey) return companies;
    return companies.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }

  private getFilter(companies: Company[], filterData: FilterData): Company[] {
    return companies.filter(
      (company) =>
        (!filterData.textBox ||
          company.business_name
            .toLowerCase()
            .includes(filterData.textBox.toLowerCase())) &&
        (!filterData.selectBoxType ||
          company.type === filterData.selectBoxType) &&
        (!filterData.selectBoxIndustry ||
          company.industry === filterData.selectBoxIndustry)
    );
  }
}
