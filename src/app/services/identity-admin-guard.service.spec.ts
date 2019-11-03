import { TestBed } from '@angular/core/testing';

import { IdentityAdminGuardService } from './identity-admin-guard.service';

describe('IdentityAdmin.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityAdminGuardService = TestBed.get(IdentityAdminGuardService);
    expect(service).toBeTruthy();
  });
});
