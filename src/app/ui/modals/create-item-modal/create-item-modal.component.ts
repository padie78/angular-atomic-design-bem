import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { formFieldsMap } from '../../../shared/forms/form-fields-map';
import { FieldDefinition } from '../../../shared/models/field-definition.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-item-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './create-item-modal.component.html',
})
export class CreateItemModalComponent {
  @Input() title: string = 'Nuevo registro';
  @Input() type!: 'order' | 'payment';
  @Input() onSubmit!: (data: any) => Promise<any>; 
  fields!: FieldDefinition[];  
  form!: FormGroup;

  constructor(private fb: FormBuilder, 
              public activeModal: NgbActiveModal, 
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.fields = formFieldsMap[this.type] || [];    
    const group: any = {};
    this.fields.forEach(f => {
      const validators = [];
      if (f.required) {
        validators.push(Validators.required);
      }
      if (f.min !== undefined) {
        validators.push(Validators.min(f.min));
      }
      group[f.name] = ['', validators];
    });
    this.form = this.fb.group(group);
  }

  async submit() {
    if (this.form.valid && this.onSubmit) {
      try {
        await this.onSubmit(this.form.value);
        this.form.markAllAsTouched();
        this.activeModal.close(true);
      } catch (err) {
        console.error('Error al crear el registro', err);
      }
    } else if (this.form.invalid) {
        this.form.markAllAsTouched(); // CLAVE para mostrar errores
      return;
    }
  }

  getErrors(controlName: string): ValidationErrors | null {
    return this.form.get(controlName)?.errors || null;
  }
}
