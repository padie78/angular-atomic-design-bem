import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OrderTableComponent } from '../../../ui/organisms/order-table/order-table.component';
import { BasePageComponent } from '../../layouts/base-page/base-page.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent, OrderTableComponent, TranslateModule],
  templateUrl: './orders.Component.html'
})
export class OrdersPage {
  constructor(private translateService: TranslateService){}
}

