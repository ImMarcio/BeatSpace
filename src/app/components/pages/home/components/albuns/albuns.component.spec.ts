import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbunsComponent } from './albuns.component';

describe('AlbunsComponent', () => {
  let component: AlbunsComponent;
  let fixture: ComponentFixture<AlbunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbunsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
