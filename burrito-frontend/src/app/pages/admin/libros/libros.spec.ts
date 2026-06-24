import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosAdmin } from './libros';

describe('Libros', () => {
  let component: LibrosAdmin;
  let fixture: ComponentFixture<LibrosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
