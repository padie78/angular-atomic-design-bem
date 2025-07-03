import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PaymentTableComponent } from '../../../ui/organisms/payment-table/payment-table.component';
import { BasePageComponent } from '../../layouts/base-page/base-page.component';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent, PaymentTableComponent, TranslateModule],
  templateUrl: './payments.Component.html'
})
export class PaymentsPage {
  constructor(private translateService: TranslateService){}
}