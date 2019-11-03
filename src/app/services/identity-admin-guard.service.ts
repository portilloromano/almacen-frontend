import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityAdminGuardService implements CanActivate {
  private isAdmin: boolean;

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  canActivate() {
    let identify = this._userService.getIdentity();
    let token = this._userService.getToken();

    if (identify) {
      this.verifRoles(token, identify.sub);
      if (this.isAdmin){
        return true;
      }else{
        this._router.navigate(['/']);
        return false;
      }
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  verifRoles(token: string, id: number) {
    this._userService.userById(token, id).subscribe(
      res => {
        this.isAdmin = (res.user.roles == 'ROLE_ADMIN') ? true : false;
      },
      error => {
        console.log(error);
      }
    )
  }
}
