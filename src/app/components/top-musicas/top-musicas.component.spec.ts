import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMusicasComponent } from './top-musicas.component';

describe('TopMusicasComponent', () => {
  let component: TopMusicasComponent;
  let fixture: ComponentFixture<TopMusicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMusicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMusicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
