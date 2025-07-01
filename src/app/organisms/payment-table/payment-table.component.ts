import { Component, computed, Signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent {
  payments: WritableSignal<Payment[]>;
  totalAmount: Signal<number>;
  
  constructor(private api: ApiService) {
    this.payments = this.api.payments;
    this.totalAmount = computed(() =>
      this.payments().reduce((sum, p) => sum + p.amount, 0)
    );
  }
}
