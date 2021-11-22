import { TestBed } from '@angular/core/testing';

import { UsuarioIdGuard } from './usuario-id.guard';

describe('UsuarioIdGuard', () => {
  let guard: UsuarioIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
