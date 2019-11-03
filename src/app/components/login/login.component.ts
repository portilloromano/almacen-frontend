import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user: User;
  pageTitle: string;
  status: string;
  message: string;
  token: string;
  identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = "Login";
    this.user = new User(0, '', '', '', '', '', true, '', '');
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    this._userService.login(this.user).subscribe(
      res => {
        if (!res.status || res.status != 'error') {
          this.status = 'success';
          this.identity = res;

          this._userService.login(this.user, true).subscribe(
            res => {
              if (!res.status || res.status != 'error') {
                this.token = res;
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                this._router.navigate(['']);
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

  logout() {
    this._route.params.subscribe(params => {
      let sure = +params['sure'];

      if (sure == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['']);
      }
    });
  }
}
