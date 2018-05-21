import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceMegaComponent } from './invoice-mega.component';

describe('InvoiceMegaComponent', () => {
  let component: InvoiceMegaComponent;
  let fixture: ComponentFixture<InvoiceMegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceMegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
