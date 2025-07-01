import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order.model';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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

  get totalAmount(): number {
    return this.orders().reduce((sum, order) => sum + order.price * order.quantity, 0);
  }

  deleteOrder(order: Order) {
    this.api.deleteOrder(order.id);
  }
  
  openConfirmModal(content: any, order: Order) {
    this.orderToDelete = order;

    this.modalService.open(content).result.then((result) => {
      if (result === 'yes' && this.orderToDelete) {
        this.api.deleteOrder(this.orderToDelete.id);
      }
    }, () => {
      // dismissed
    });    
  }

  onRowEditInit(order: Order) {
    this.editingRow = { ...order };
  }

  onRowEditSave(order: Order) {
    if (this.editingRow) {
      this.api.updateOrder(order.id, this.editingRow!);
      this.editingRow = null;
    }
  }

  onRowEditCancel() {
    this.editingRow = null;
  }
}
