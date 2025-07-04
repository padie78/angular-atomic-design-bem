import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConfirmModalComponent } from './remove-confirm-modal.component';

describe('RemoveConfirmModalComponent', () => {
  let component: RemoveConfirmModalComponent;
  let fixture: ComponentFixture<RemoveConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveConfirmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
