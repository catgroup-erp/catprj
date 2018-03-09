import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoheaderFormComponent } from './poheader-form.component';

describe('PoheaderFormComponent', () => {
  let component: PoheaderFormComponent;
  let fixture: ComponentFixture<PoheaderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoheaderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoheaderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
