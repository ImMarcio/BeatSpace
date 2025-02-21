import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbunssalvosComponent } from './albunssalvos.component';

describe('AlbunssalvosComponent', () => {
  let component: AlbunssalvosComponent;
  let fixture: ComponentFixture<AlbunssalvosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbunssalvosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbunssalvosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
