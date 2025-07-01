import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../atoms/card/card.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-card-with-actions',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './card-with-actions.component.html',
  styleUrls: ['./card-with-actions.component.scss']
})
export class CardWithActionsComponent {
  @Input() title = '';
  @Output() action = new EventEmitter<string>();

  onAction(type: string) {
    this.action.emit(type);
  }
}
