import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopartistasComponent } from './topartistas.component';

describe('TopartistasComponent', () => {
  let component: TopartistasComponent;
  let fixture: ComponentFixture<TopartistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopartistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopartistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
