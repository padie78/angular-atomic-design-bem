export interface ColumnDefinition {
  key: string;
  label: string;
  type?: 'text' | 'currency' | 'date'; 
  defaultValue?: string; 
}
