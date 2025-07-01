import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentTableComponent } from '../../../ui/organisms/payment-table/payment-table.component';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PaymentTableComponent],
  templateUrl: './payments.Component.html'
})
export class PaymentsPage {}