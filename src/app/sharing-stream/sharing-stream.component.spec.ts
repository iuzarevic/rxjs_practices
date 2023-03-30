import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingStreamComponent } from './sharing-stream.component';

describe('SharingStreamComponent', () => {
  let component: SharingStreamComponent;
  let fixture: ComponentFixture<SharingStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharingStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharingStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
