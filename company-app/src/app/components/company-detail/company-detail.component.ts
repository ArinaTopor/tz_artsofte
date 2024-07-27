import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';
import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  public company$: Observable<Company | undefined> | undefined;

  constructor(
    private _companyService: CompaniesService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.company$ = this._companyService.getCompanyById(
      +this._activateRoute.snapshot.params['id']
    );
  }
}
