import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnDefinition } from '../../../shared/models/column-definition.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent {
  @Input() columns: ColumnDefinition[] = [];
  @Input() data: any[] = [];
  @Input() showActions = false;

  @Output() delete = new EventEmitter<any>();
}
