import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoModalComponent } from './detalle-pedido-modal.component';

describe('DetallePedidoModalComponent', () => {
  let component: DetallePedidoModalComponent;
  let fixture: ComponentFixture<DetallePedidoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePedidoModalComponent]
    });
    fixture = TestBed.createComponent(DetallePedidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
