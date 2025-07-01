import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-item-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-item-modal.component.html',
})
export class CreateItemModalComponent {
  @Input() title: string = 'Nuevo registro';
  @Input() fields: { name: string; label: string; type: string }[] = [];
  @Input() onSubmit!: (data: any) => Promise<any>; 
  
  form!: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = [''];
    });
    this.form = this.fb.group(group);
  }

  async submit() {
    if (this.form.valid && this.onSubmit) {
      try {
        await this.onSubmit(this.form.value);
        this.activeModal.close(true);
      } catch (err) {
        console.error('Error al crear el registro', err);
      }
    }
  }
}
