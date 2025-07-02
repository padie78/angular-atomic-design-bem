import { FieldDefinition } from '../models/field-definition.model';
import { orderFormFields } from './order-form.config';
import { paymentFormFields } from './payment-form-config';


export const formFieldsMap: Record<string, FieldDefinition[]> = {
  order: orderFormFields,
  payment: paymentFormFields
};