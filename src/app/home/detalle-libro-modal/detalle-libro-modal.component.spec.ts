import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibroModalComponent } from './detalle-libro-modal.component';

describe('DetalleLibroModalComponent', () => {
  let component: DetalleLibroModalComponent;
  let fixture: ComponentFixture<DetalleLibroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleLibroModalComponent]
    });
    fixture = TestBed.createComponent(DetalleLibroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
