import { Component } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { CompanyItem } from '../company-item/company-item.component';
import { CompanySortComponent } from '../company-sort/company-sort.component';
import { Observable, of, switchMap } from 'rxjs';
import { Company } from '../../models/company';
import { FilterData } from '../../models/filter-form';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
  providers: [CompanyItem, CompanySortComponent],
})
export class CompanyList {
  public dataCompanies: Observable<Company[]>;
  constructor(private companiesService: CompaniesService) {
    this.dataCompanies = this.companiesService.companies$;
  }
  public sortData(key: string) {
    this.dataCompanies = this.companiesService.sortList(key);
  }
  public sortAbdFilters(data?: FilterData, sortKey?: string) {}
  public getFilter(data: FilterData) {
    this.dataCompanies = this.companiesService.companies$.pipe(
      switchMap((companies) => {
        return of(
          companies.filter(
            (company) =>
              (!data.textBox ||
                company.business_name
                  .toLocaleLowerCase()
                  .includes(data.textBox.toLocaleLowerCase())) &&
              (!data.selectBoxType || company.type === data.selectBoxType) &&
              (!data.selectBoxIndustry ||
                company.industry === data.selectBoxIndustry)
          )
        );
      })
    );
  }
}
