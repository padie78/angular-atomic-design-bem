import { computed, Injectable } from "@angular/core";
import { ApiService } from "./api.service";


@Injectable({ providedIn: 'root' })
export class StatsService {
  constructor(private api: ApiService) {}

  // Señales que leen directamente de api y calculan valores
  totalOrders = computed(() => this.api.orders().length);
  totalPayments = computed(() => this.api.payments().length);
  totalAmount = computed(() =>
    this.api.payments().reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  );
}