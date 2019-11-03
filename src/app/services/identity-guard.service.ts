import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class IdentityGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  canActivate() {
    let identify = this._userService.getIdentity();

    if (identify) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
