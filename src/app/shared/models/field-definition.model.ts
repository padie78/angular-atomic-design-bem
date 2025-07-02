// src/app/shared/models/field-definition.model.ts

export interface FieldDefinition {
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'select';
  required?: boolean; 
  min?: number;             
  max?: number;               
  pattern?: string;             
  options?: {               
    value: any;
    label: string;
  }[];
}
