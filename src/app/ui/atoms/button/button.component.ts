import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label = 'Click'; 
  @Input() type: 'button' | 'submit' = 'button';
  @Input() className = 'c-button';  // Valor por defecto
}