import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRechargeComponent } from './quick-recharge.component';

describe('QuickRechargeComponent', () => {
  let component: QuickRechargeComponent;
  let fixture: ComponentFixture<QuickRechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
