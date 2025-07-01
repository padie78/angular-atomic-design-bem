import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Payment } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private ORDER_URL = '/api/orders';
  private PAYMENT_URL = '/api/payments';

  public orders = signal<Order[]>([]);
  payments = signal<Payment[]>([]);

  constructor(private http: HttpClient) {
    this.fetchOrders();
    this.fetchPayments();
  }

  private fetchOrders() {
    this.http.get<Order[]>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/orders')
      .subscribe(data => this.orders.set(data));
  }

  private fetchPayments() {
    this.http.get<Payment[]>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/payments')
      .subscribe(data => this.payments.set(data));
  }

  createOrder(order: Order) {
    this.http.post<Order>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/orders', order)
      .subscribe(created => {
        this.orders.update(list => [...list, created]);
      });
  }

  createPayment(payment: Payment) {
    this.http.post<Payment>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/payments', payment)
      .subscribe(created => {
        this.payments.update(list => [...list, created]);
      });
    }

    deleteOrder(id: string) {
      this.http.delete(`https://6862ba6d96f0cc4e34bac94f.mockapi.io/orders/${id}`).subscribe(() => {
        this.fetchOrders(); // recargar lista actualizada
      });
    }

    updateOrder(id: string, updatedOrder: Partial<Order>) {      
      this.http.put<Order>(`https://6862ba6d96f0cc4e34bac94f.mockapi.io/orders/${id}`, updatedOrder).subscribe((updated) => {
        const updatedList = this.orders().map(order =>
          order.id === id ? { ...order, ...updated } : order
        );
        this.orders.set(updatedList);
      });
    }

      deletePayment(id: string) {
      this.http.delete(`https://6862ba6d96f0cc4e34bac94f.mockapi.io/payments/${id}`).subscribe(() => {
        this.fetchPayments(); // recargar lista actualizada
      });
    }
  }