import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderFormComponent } from '../../organisms/order-form/order-form.component';
import { OrderTableComponent } from '../../organisms/order-table/order-table.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderFormComponent, OrderTableComponent],
  templateUrl: './orders.Component.html'
})
export class OrdersPage {}

