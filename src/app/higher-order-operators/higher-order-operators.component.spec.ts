import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrderOperatorsComponent } from './higher-order-operators.component';

describe('HigherOrderOperatorsComponent', () => {
  let component: HigherOrderOperatorsComponent;
  let fixture: ComponentFixture<HigherOrderOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherOrderOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherOrderOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
