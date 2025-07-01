import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './remove-confirm-modal.component.html'  
})
export class ConfirmModalComponent {
  @Input() title?: string;
  @Input() message!: string;

  constructor(public activeModal: NgbActiveModal, private translateService: TranslateService) {}
}