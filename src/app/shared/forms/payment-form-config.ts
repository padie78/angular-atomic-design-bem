import { FieldDefinition } from "../models/field-definition.model";

export const paymentFormFields: FieldDefinition[] = [
      { name: 'amount', label: 'Amount', type: 'number', required: true, min: 1}
    ];