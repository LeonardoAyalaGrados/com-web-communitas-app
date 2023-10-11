import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveUserComponent } from './modal-save-user.component';

describe('ModalSaveUserComponent', () => {
  let component: ModalSaveUserComponent;
  let fixture: ComponentFixture<ModalSaveUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSaveUserComponent]
    });
    fixture = TestBed.createComponent(ModalSaveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
