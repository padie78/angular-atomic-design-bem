import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order.model';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../../modals/remove-confirm-modal/remove-confirm-modal.component';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule],
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent {
  orders = computed(() => this.api.orders());
  orderToDelete: Order | null = null;
  editingRow: Order | null = null;
  statusOptions = [
    { label: 'pending', value: 'pending' },
    { label: 'completed', value: 'completed' },
    { label: 'cancelled', value: 'cancelled' }
  ];

  constructor(private api: ApiService, private modalService: NgbModal) {}  

  onRowEditInit(order: Order) {
    this.editingRow = { ...order };
  }

  onRowEditSave(order: Order) {
    if (this.editingRow) {
      this.api.updateOrder(order.id, this.editingRow!);
      this.editingRow = null;
    }
  }

  openDeleteModal(order: Order) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Removing Confirm';
    modalRef.componentInstance.message = `¿Do you want to remove ${order.product}?`;
    modalRef.result.then((confirmed: boolean) => {
        if (confirmed) {
          this.api.deleteOrder(order.id);
        }
    });  
  }
}
