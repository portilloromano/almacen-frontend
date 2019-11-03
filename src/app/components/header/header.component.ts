import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit, DoCheck {
  identity: any;
  token: string;
  isAdmin: boolean;
  prevToken: string;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {

  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if (this.token != null && this.token != this.prevToken) {
      this.verifRoles();
    }
  }

  verifRoles() {
    this.prevToken = this.token;
    this._userService.userById(this.token, this.identity.sub).subscribe(
      res => {
        this.isAdmin = (res.user.roles == 'ROLE_ADMIN') ? true : false;
      },
      error => {
        console.log(error);
      }
    )
  }
}
