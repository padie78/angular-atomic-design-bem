import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-dropdown.component.html',
})
export class SelectDropdownComponent {
  @Input() options: { value: string; label: string }[] = [];
  @Input() selected?: string;

  @Output() optionSelected = new EventEmitter<string>();

  onSelect(value: string) {
    this.optionSelected.emit(value);
  }
}


