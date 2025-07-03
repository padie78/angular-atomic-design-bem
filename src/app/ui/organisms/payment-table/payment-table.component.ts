import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from '../../../shared/models/payment.model';
import { ApiService } from '../../../services/api.service';
import { ConfirmModalComponent } from '../../modals/remove-confirm-modal/remove-confirm-modal.component';
import { CreateItemModalComponent } from '../../modals/create-item-modal/create-item-modal.component';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { PaginatedComponent } from '../../../shared/base/paginated.component';
import { IconButtonComponent } from '../../molecules/icon-button/icon-button.component';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';
import { DataTableComponent } from '../../molecules/data-table/data-table.component';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, TranslateModule, DataTableComponent, IconButtonComponent],
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent extends PaginatedComponent<Payment> {
  payments: Signal<Payment[]>;
  columns: ColumnDefinition[] = [
  { key: 'id', label: 'TABLE-COLUMNS.ID' },
  { key: 'date', label: 'TABLE-COLUMNS.DATE', type: 'date' },
  { key: 'amount', label: 'TABLE-COLUMNS.AMOUNT', type: 'currency' },
  { key: 'status', label: 'TABLE-COLUMNS.STATUS' },
  { key: 'method', label: 'TABLE-COLUMNS.METHOD' }
];

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
    modalRef.componentInstance.type = 'payment';
    modalRef.componentInstance.onSubmit = async (data: Payment) => await firstValueFrom(this.api.createPayment(data));
    modalRef.result
      .then(result => {
        if (result) {
          this.api.fetchPayments();
        }
      })
      .catch(() => {});
    }

    getItems(): Payment[] {
      return this.payments();
    }

}
