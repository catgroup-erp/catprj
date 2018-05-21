import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFormatComponent } from './budget-format.component';

describe('BudgetFormatComponent', () => {
  let component: BudgetFormatComponent;
  let fixture: ComponentFixture<BudgetFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
