import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdenModalComponent } from './detalle-orden-modal.component';

describe('DetalleOrdenModalComponent', () => {
  let component: DetalleOrdenModalComponent;
  let fixture: ComponentFixture<DetalleOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleOrdenModalComponent]
    });
    fixture = TestBed.createComponent(DetalleOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
