import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  user: User;
  pageTitle: string;
  status: string;
  message: string;
  identity: any;
  token: string;
  own: boolean;
  isAdmin: boolean;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.pageTitle = "Editar usuario";
  }

  ngOnInit() {
    this.readParams();
    this.verifRoles();
  }

  verifRoles(){
    this._userService.userById(this.token, this.identity.sub).subscribe(
      res => {
        this.isAdmin = (res.user.roles == 'ROLE_ADMIN') ? true : false;
      },
      error => {
        console.log(error);
      }
    )
  }

  readParams() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      if (isNaN(id)) {
        id = this.identity.sub
      }
      this._userService.userById(this.token, id).subscribe(
        res => {
          this.user = (res['user']);
        },
        error => {
          console.log(error);
        }
      )
    });
  }

  onSubmit(form) {
    this._userService.userEdit(this.token, this.user).subscribe(
      res => {
        if (res.status == 'success') {
          this.status = 'success';
          this.message = res.message;

          this.own = (res.user.id == this.identity.sub) ? true : false;

          if (this.own) {
            localStorage.removeItem('identity');
            localStorage.removeItem('token');
          }
        } else {
          this.status = 'error';
          this.message = res.message;
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    )
  }
}
