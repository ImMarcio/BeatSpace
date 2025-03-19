/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResenhasComponent } from './resenhas.component';

describe('ResenhasComponent', () => {
  let component: ResenhasComponent;
  let fixture: ComponentFixture<ResenhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
