import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarClientComponent } from './sidebar-client.component';

describe('SidebarClientComponent', () => {
  let component: SidebarClientComponent;
  let fixture: ComponentFixture<SidebarClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarClientComponent]
    });
    fixture = TestBed.createComponent(SidebarClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
