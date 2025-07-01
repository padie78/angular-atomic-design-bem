import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderTableComponent } from '../../../ui/organisms/order-table/order-table.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderTableComponent],
  templateUrl: './orders.Component.html'
})
export class OrdersPage {}

