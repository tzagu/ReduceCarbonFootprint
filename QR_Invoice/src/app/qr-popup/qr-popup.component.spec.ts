import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPopupComponent } from './qr-popup.component';

describe('QrPopupComponent', () => {
  let component: QrPopupComponent;
  let fixture: ComponentFixture<QrPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrPopupComponent]
    });
    fixture = TestBed.createComponent(QrPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
