import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopmusicasComponent } from './topmusicas.component';

describe('TopmusicasComponent', () => {
  let component: TopmusicasComponent;
  let fixture: ComponentFixture<TopmusicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopmusicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopmusicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
