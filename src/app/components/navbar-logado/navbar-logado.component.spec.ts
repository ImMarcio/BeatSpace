import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLogadoComponent } from './navbar-logado.component';
import { SpotifyService } from '../../shared/services/spotify.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('NavbarLogadoComponent', () => {
  let component: NavbarLogadoComponent;
  let fixture: ComponentFixture<NavbarLogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule,RouterModule],
      declarations : [NavbarLogadoComponent],
      providers : [SpotifyService,ChangeDetectorRef,Router]
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
