import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEstadoModalComponent } from './cambiar-estado-modal.component';

describe('CambiarEstadoModalComponent', () => {
  let component: CambiarEstadoModalComponent;
  let fixture: ComponentFixture<CambiarEstadoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarEstadoModalComponent]
    });
    fixture = TestBed.createComponent(CambiarEstadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
