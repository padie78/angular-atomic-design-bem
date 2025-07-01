import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from '../../../models/payment.model';
import { ApiService } from '../../../services/api.service';
import { ConfirmModalComponent } from '../../modals/remove-confirm-modal/remove-confirm-modal.component';
import { CreateItemModalComponent } from '../../modals/create-item-modal/create-item-modal.component';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { PaginatedComponent } from '../../../shared/base/paginated.component';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent extends PaginatedComponent<Payment> {
  payments: Signal<Payment[]>;

  constructor(private api: ApiService, 
              private modalService: NgbModal,
              private translateService: TranslateService) {
    super();
    this.payments = this.api.payments;    
  }

  openDeleteModal(payment: Payment) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = this.translateService.instant('MODAL.TITLE');;
    modalRef.componentInstance.message = this.translateService.instant('MODAL.MESSAGE', { id: payment.id });
    modalRef.result.then((confirmed: boolean) => {
        if (confirmed) {
          this.api.deletePayment(payment.id);
        }
    });  
  }

  openPaymentModal() {        
    const modalRef = this.modalService.open(CreateItemModalComponent);
    modalRef.componentInstance.title = 'New Payment';
    modalRef.componentInstance.fields = [
      { name: 'amount', label: 'Amount', type: 'number' }
    ];
    modalRef.componentInstance.onSubmit = (data: Payment) => firstValueFrom(this.api.createPayment(data));
    modalRef.result
      .then(result => {
        if (result === true) {
          this.api.fetchPayments();
        }
      })
      .catch(() => {});
    }

    getItems(): Payment[] {
      return this.payments();
    }

}
