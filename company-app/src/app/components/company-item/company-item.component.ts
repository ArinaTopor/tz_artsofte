import { Component, Input } from '@angular/core';
import { Company } from '../../models/company';

@Component({
  selector: 'company-item',
  templateUrl: './company-item.component.html',
  styleUrl: './company-item.component.scss',
})
export class CompanyItem {
  @Input() company?: Company;
  constructor() {}
}
