import { Component, computed, Signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Payment } from '../../models/payment.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent {
  paymentToDelete: Payment | null = null;
  payments: WritableSignal<Payment[]>;
  totalAmount: Signal<number>;
  
  constructor(private api: ApiService, private modalService: NgbModal) {
    this.payments = this.api.payments;
    this.totalAmount = computed(() =>
      this.payments().reduce((sum, p) => sum + p.amount, 0)
    );
  }

    openConfirmModal(content: any, payment: Payment) {
      this.paymentToDelete = payment;
  
      this.modalService.open(content).result.then((result) => {
        if (result === 'yes' && this.paymentToDelete) {
          this.api.deletePayment(this.paymentToDelete.id);
        }
      }, () => {
        // dismissed
      });    
    }
}
