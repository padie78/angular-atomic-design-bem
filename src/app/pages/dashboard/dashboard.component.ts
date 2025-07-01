import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { StatsService } from '../../services/stats.services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: {
        echarts: () => import('echarts'),  // carga dinámica de echarts
      }
    }
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPage {
  
  chartOptions = {
    title: {
      text: 'Orders',
    },
    tooltip: {},
    xAxis: {
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    },
    yAxis: {},
    series: [
      {
        name: 'Ventas',
        type: 'bar',
        data: [5, 20, 36, 10, 10],
      },
    ],
  };


  constructor(private api: ApiService, public stats: StatsService) {}
}