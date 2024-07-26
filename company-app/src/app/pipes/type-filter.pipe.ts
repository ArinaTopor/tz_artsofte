import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../models/company';

@Pipe({
  name: 'type-filter',
})
export class SearchPipe implements PipeTransform {
  transform(value: string, data: Company[]): Company[] {
    if (!value) return data;
    return data.filter((item) => item.type === value);
  }
}
