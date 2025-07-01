import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent {
  @Input() options: { label: string; value: any }[] = [];
  @Input() selected: any = null;
  @Output() selectedChange = new EventEmitter<any>();

  onSelect(value: any) {
    this.selected = value;
    this.selectedChange.emit(value);
  }
}

