import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import {
  BehaviorSubject,
  filter,
  find,
  map,
  Observable,
  pipe,
  tap,
} from 'rxjs';
import { FilterData } from '../models/filter-form';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  public companies$: Observable<Company[]> =
    this.companiesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    this.http
      .get<Company[]>(
        'https://random-data-api.com/api/company/random_company?size=100'
      )
      .subscribe((data) => {
        this.companiesSubject.next(data);
      });
  }

  public getTypes(): Observable<string[]> {
    return this.companies$.pipe(
      map((companies) => [...new Set(companies.map((company) => company.type))])
    );
  }

  public getIndustries(): Observable<string[]> {
    return this.companies$.pipe(
      map((companies) => [
        ...new Set(companies.map((company) => company.industry)),
      ])
    );
  }

  public sortList(key: string): Observable<Company[]> {
    if (!key) return this.companies$;
    return this.companies$.pipe(
      map((companies) =>
        [...companies].sort((a, b) => a[key].localeCompare(b[key]))
      )
    );
  }
  public filterData(companies: Company[], data: FilterData) {
    return companies.filter(
      (company) =>
        (!data.textBox ||
          company.business_name
            .toLocaleLowerCase()
            .includes(data.textBox.toLocaleLowerCase())) &&
        (!data.selectBoxType || company.type === data.selectBoxType) &&
        (!data.selectBoxIndustry || company.industry === data.selectBoxIndustry)
    );
  }

  public sortData(companies: Company[], sortKey: string) {
    return companies.sort((company1, company2) =>
      company1[sortKey].toLocaleCompare(company2[sortKey])
    );
  }

  public sortAndFilterCompanies(
    data: FilterData,
    sortKey: string
  ): Observable<Company[]> {
    return this.companies$.pipe(
      map((coompanies) => {
        const list = this.filterData(coompanies, data);
        return this.sortData(list, sortKey);
      })
    );
  }

  public getCompanyById(id: number): Observable<Company | undefined> {
    return this.companies$.pipe(
      map((companies) => companies.find((company) => company.id === id))
    );
  }

  public getCompaniesByType(type: string) {
    if (type === 'all') return this.companies$;
    return this.companies$.pipe(
      map((companies) => [...companies].filter((a) => a.type === type))
    );
  }
  public getCompaniesByIndustry(industry: string) {
    if (industry === 'all') return this.companies$;
    return this.companies$.pipe(
      map((companies) => [...companies].filter((a) => a.industry === industry))
    );
  }
}
