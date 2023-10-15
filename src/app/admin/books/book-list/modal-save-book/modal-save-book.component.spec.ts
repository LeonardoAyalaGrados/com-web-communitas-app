import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveBookComponent } from './modal-save-book.component';

describe('ModalSaveBookComponent', () => {
  let component: ModalSaveBookComponent;
  let fixture: ComponentFixture<ModalSaveBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSaveBookComponent]
    });
    fixture = TestBed.createComponent(ModalSaveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
