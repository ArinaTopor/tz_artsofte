import { FormControl } from '@angular/forms';

export interface FilterForm {
  textBox: FormControl<string>;
  selectBoxType: FormControl<string>;
  selectBoxIndustry: FormControl<string>;
}
export type FilterData = Partial<{
  textBox: string;
  selectBoxType: string;
  selectBoxIndustry: string;
}>;
