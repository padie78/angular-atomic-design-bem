import { Component, computed, Signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Payment } from '../../models/payment.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../modals/remove-confirm-modal/remove-confirm-modal.component';

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

  openDeleteModal(payment: Payment) {
      const modalRef = this.modalService.open(ConfirmModalComponent);
      modalRef.componentInstance.title = 'Removing Confirm';
      modalRef.componentInstance.message = `¿Do you want to remove ${payment.id}?`;
      modalRef.result.then((confirmed: boolean) => {
          if (confirmed) {
            this.api.deletePayment(payment.id);
          }
      });  
    }
}
