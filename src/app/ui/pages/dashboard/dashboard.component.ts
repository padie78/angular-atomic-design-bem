import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { StatsService } from '../../../services/stats.services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BasePageComponent } from '../../layouts/base-page/base-page.component';
import { CardComponent } from '../../atoms/card/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent, NgxEchartsModule, TranslateModule, CardComponent],
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
  
  constructor(private api: ApiService, public stats: StatsService, private translateService: TranslateService) {}
  
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


}