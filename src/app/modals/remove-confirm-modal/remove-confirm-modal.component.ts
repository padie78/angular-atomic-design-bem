import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './remove-confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Input() title?: string;
  @Input() message!: string;

  constructor(public activeModal: NgbActiveModal) {}
}