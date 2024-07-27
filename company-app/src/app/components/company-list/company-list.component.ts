import { Component } from '@angular/core';
import { CompanyItem } from '../company-item/company-item.component';
import { CompanySortComponent } from '../company-sort/company-sort.component';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';
import { FilterData } from '../../models/filter-form';
import { DataCompaniesService } from '../../services/data-companies.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  providers: [CompanyItem, CompanySortComponent],
})
export class CompanyList {
  public dataCompanies$: Observable<Company[]>;
  public loading: boolean = false;
  constructor(private _dataCompaniesService: DataCompaniesService) {
    this.isLoad();
    this.dataCompanies$ = this._dataCompaniesService.transformDataCompanies$;
  }
  public updateSort(key: string) {
    this._dataCompaniesService.updateSortKey(key);
  }
  public updateFilter(data: FilterData) {
    this._dataCompaniesService.updateFilterData(data);
  }
  public isLoad() {
    setTimeout(() => (this.loading = true), 5000);
  }
}
