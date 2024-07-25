import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
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
    private companyService: CompaniesService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.company$ = this.activateRoute.params.pipe(
      switchMap((params) => this.companyService.getCompanyById(+params['id']))
    );
  }
}
