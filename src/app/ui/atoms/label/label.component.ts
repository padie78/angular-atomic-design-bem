import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input() text = '';
  @Input() for = '';
}