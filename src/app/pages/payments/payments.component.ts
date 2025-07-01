import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaymentFormComponent } from '../../organisms/payment-form/payment-form.component';
import { PaymentTableComponent } from '../../organisms/payment-table/payment-table.component';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PaymentFormComponent, PaymentTableComponent],
  templateUrl: './payments.Component.html'
})
export class PaymentsPage {}