import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() label = '';
  @Input() icon = ''; // nombre del ícono
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() className = '';

  @Output() clicked = new EventEmitter<void>();
}
