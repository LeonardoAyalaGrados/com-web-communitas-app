import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraModalComponent } from './compra-modal.component';

describe('CompraModalComponent', () => {
  let component: CompraModalComponent;
  let fixture: ComponentFixture<CompraModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraModalComponent]
    });
    fixture = TestBed.createComponent(CompraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
