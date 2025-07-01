import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, ButtonComponent, InputComponent, FormsModule, NgbAlertModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent {
  amount = signal(1);
  date = signal(new Date);
  showSuccess = false;
  
  constructor(private api: ApiService) {}

  submit() {
    if (!this.amount()) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.api.createPayment({
      id: this.generateId(),
      amount: this.amount(),
      date: this.date(),
      status: 'pending',
      method: 'credit_card'
    });

      this.showSuccess = true;

    // Limpiar formulario
    this.amount.set(1);

    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }

  private generateId(): string {
    // Genera un ID simple (puedes usar uuid o similar)
    return Math.random().toString(36).substr(2, 9);
  }
}
