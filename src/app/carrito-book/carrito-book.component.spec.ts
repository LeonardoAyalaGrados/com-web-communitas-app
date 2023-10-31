import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoBookComponent } from './carrito-book.component';

describe('CarritoBookComponent', () => {
  let component: CarritoBookComponent;
  let fixture: ComponentFixture<CarritoBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoBookComponent]
    });
    fixture = TestBed.createComponent(CarritoBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
