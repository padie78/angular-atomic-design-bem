import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order.model';
import { ConfirmModalComponent } from '../../modals/remove-confirm-modal/remove-confirm-modal.component';
import { CreateItemModalComponent } from '../../modals/create-item-modal/create-item-modal.component';
@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule],
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent {
  orders: Signal<Order[]>;

  constructor(private api: ApiService, 
              private modalService: NgbModal,
              private translateService: TranslateService) {
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
    modalRef.componentInstance.fields = [
      { name: 'product', label: 'Product', type: 'string' },
      { name: 'quantity', label: 'quantity', type: 'number' },
      { name: 'price', label: 'price', type: 'number' },
      { name: 'status', label: 'status', type: 'string' }            
    ];
    modalRef.componentInstance.onSubmit = (data: Order) => firstValueFrom(this.api.createOrder(data));
    modalRef.result
      .then(result => {
        if (result === true) {
          this.api.fetchOrders();
        }
      })
      .catch(() => {});
    }
}
