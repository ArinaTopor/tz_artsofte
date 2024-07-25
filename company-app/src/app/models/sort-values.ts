export type SortValue = {
  id: number;
  title: string;
  value: string;
};
export const SortValues: SortValue[] = [
  { id: 0, title: '-', value: '' },
  { id: 1, title: 'названию', value: 'business_name' },
  { id: 2, title: 'типу', value: 'type' },
  { id: 3, title: 'виду деятельности', value: 'industry' },
];
