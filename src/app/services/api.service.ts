import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/models/order.model';
import { Payment } from '../shared/models/payment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private ORDER_URL = '/api/orders';
  private PAYMENT_URL = '/api/payments';
  orders = signal<Order[]>([]);
  payments = signal<Payment[]>([]);

  constructor(private http: HttpClient) {
    this.fetchOrders();
    this.fetchPayments();
  }

  fetchOrders() {
    this.http.get<Order[]>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/orders')
      .subscribe(data => this.orders.set(data));
  }

  fetchPayments() {
    this.http.get<Payment[]>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/payments')
      .subscribe(data => this.payments.set(data));
  }

   createOrder(order: Order): Observable<Order> {
      return this.http.post<Order>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/orders', order);
    }

    createPayment(payment: Payment): Observable<Payment> {
      return this.http.post<Payment>('https://6862ba6d96f0cc4e34bac94f.mockapi.io/payments', payment);
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