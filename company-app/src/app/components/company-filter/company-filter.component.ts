import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'company-filter',
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss',
})
export class CompanyFilter {
  @Output() filterEvent = new EventEmitter<string>();
  public types: Observable<string[]>;
  public industries: Observable<string[]>;
  protected filterForm = new FormGroup({
    textBox: new FormControl(''),
    selectBoxType: new FormControl(''),
    selectBoxIndustry: new FormControl(''),
  });
  constructor(companyService: CompaniesService) {
    this.types = companyService.getTypes();
    this.industries = companyService.getIndustries();
  }
}
