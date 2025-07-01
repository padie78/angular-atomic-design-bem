import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../atoms/input/input.component";
import { LabelComponent } from "../../atoms/label/label.component";

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent, LabelComponent],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() placeholder = '';
}