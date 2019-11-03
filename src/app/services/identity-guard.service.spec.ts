import { TestBed } from '@angular/core/testing';

import { IdentityGuardService } from './identity-guard.service';

describe('IdentityGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityGuardService = TestBed.get(IdentityGuardService);
    expect(service).toBeTruthy();
  });
});
