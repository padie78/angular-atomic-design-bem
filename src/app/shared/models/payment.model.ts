export type PaymentMethod = 'credit_card' | 'paypal' | 'cash' | 'bank_transfer';

export interface Payment {
  id: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  method: 'credit_card' | 'paypal' | 'cash' | 'bank_transfer';
}