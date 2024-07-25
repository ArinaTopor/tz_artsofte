import { Component } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { CompanyItem } from '../company-item/company-item.component';
import { CompanySortComponent } from '../company-sort/company-sort.component';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';

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
  public getData() {
    return this.companiesService.companies$;
  }
  public sortData(key: string) {
    this.dataCompanies = this.companiesService.sortList(key);
  }
}
