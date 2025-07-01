import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, ButtonComponent, InputComponent, FormsModule, NgbAlertModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  product = signal('');
  quantity = signal(1);
  price = signal(0);
  showSuccess = false;
  
  constructor(private api: ApiService) {}

  submit() {
    if (!this.product() || this.quantity() <= 0 || this.price() <= 0) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.api.createOrder({
      id: this.generateId(),
      product: this.product(),
      quantity: this.quantity(),
      price: this.price(),
      date: new Date(),
      status: 'pending',
    });

      this.showSuccess = true;

    // Limpiar formulario
    this.product.set('');
    this.quantity.set(1);
    this.price.set(0);

    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }

  private generateId(): string {
    // Genera un ID simple (puedes usar uuid o similar)
    return Math.random().toString(36).substr(2, 9);
  }
}
