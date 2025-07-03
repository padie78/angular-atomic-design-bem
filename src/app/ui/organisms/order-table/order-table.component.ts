import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { Order } from '../../../shared/models/order.model';
import { ConfirmModalComponent } from '../../modals/remove-confirm-modal/remove-confirm-modal.component';
import { CreateItemModalComponent } from '../../modals/create-item-modal/create-item-modal.component';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { PaginatedComponent } from '../../../shared/base/paginated.component';
import { IconButtonComponent } from '../../molecules/icon-button/icon-button.component';
import { DataTableComponent } from '../../molecules/data-table/data-table.component';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';


@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, PaginatorComponent, TranslateModule, DataTableComponent, IconButtonComponent],
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent extends PaginatedComponent<Order> {
  orders: Signal<Order[]>;
  columns: ColumnDefinition[] = [
    { key: 'id', label: 'TABLE-COLUMNS.ID' },
    { key: 'product', label: 'TABLE-COLUMNS.PRODUCT' },
    { key: 'quantity', label: 'TABLE-COLUMNS.QUANTITY' },
    { key: 'price', label: 'TABLE-COLUMNS.PRICE', type: 'currency' },
    { key: 'date', label: 'TABLE-COLUMNS.DATE', type: 'date' },
    { key: 'status', label: 'TABLE-COLUMNS.STATUS' },
  ];

  constructor(private api: ApiService, 
              private modalService: NgbModal,
              private translateService: TranslateService) {
    super();
    this.orders = this.api.orders;
  }  
                
  openDeleteModal(order: Order) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = this.translateService.instant('MODAL.TITLE');
    modalRef.componentInstance.message = this.translateService.instant('MODAL.MESSAGE', { id: order.id });
    modalRef.result.then((confirmed: boolean) => {
        if (confirmed) {
          this.api.deleteOrder(order.id);
        }
    });  
  }

  openOrderModal() {        
    const modalRef = this.modalService.open(CreateItemModalComponent);
    modalRef.componentInstance.title = 'New Order';
    modalRef.componentInstance.type = 'order';
    modalRef.componentInstance.onSubmit = async (data: Order) => { 
      await firstValueFrom(this.api.createOrder({ ...data, date: new Date() }));
    }
    modalRef.result
      .then(result => {
        if (result) {
          this.api.fetchOrders();
        }
      })
      .catch(() => {});
    }
 
    getItems(): Order[] {
      return this.orders();
    }


}
