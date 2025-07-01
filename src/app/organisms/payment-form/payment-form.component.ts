import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PaymentMethod } from '../../models/payment.model';

@Component({
  standalone: true,
  selector: 'app-payment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-form.Component.html'
})
export class PaymentFormComponent {
  amount = 0;
  method: PaymentMethod = 'credit_card';
  status: 'pending' | 'completed' | 'failed' = 'pending';


  constructor(private api: ApiService, private router: Router) {}

  submit() {
    this.api.createPayment({
      id: crypto.randomUUID(),
      amount: this.amount,
      date: new Date(),
      method: this.method,
      status: this.status
    });
    this.router.navigateByUrl('/');
  }
}
