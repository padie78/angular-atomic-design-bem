import { FieldDefinition } from "../models/field-definition.model";

export const orderFormFields: FieldDefinition[] = [
  { name: 'product', label: 'Product', type: 'string', required: true },
  { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 1 },
  { name: 'price', label: 'Price', type: 'number', required: true },
  { name: 'status', label: 'Status', type: 'string', required: true }
];