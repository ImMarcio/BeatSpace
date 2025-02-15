import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsFavoritosComponent } from './albums-favoritos.component';

describe('AlbumsFavoritosComponent', () => {
  let component: AlbumsFavoritosComponent;
  let fixture: ComponentFixture<AlbumsFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumsFavoritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
