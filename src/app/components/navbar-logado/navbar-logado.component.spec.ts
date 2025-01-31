import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogadoComponent } from './navbar-logado.component';

describe('NavbarLogadoComponent', () => {
  let component: NavbarLogadoComponent;
  let fixture: ComponentFixture<NavbarLogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
