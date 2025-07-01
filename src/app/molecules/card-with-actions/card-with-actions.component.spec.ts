import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithActionsComponent } from './card-with-actions.component';

describe('CardWithActionsComponent', () => {
  let component: CardWithActionsComponent;
  let fixture: ComponentFixture<CardWithActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWithActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWithActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
