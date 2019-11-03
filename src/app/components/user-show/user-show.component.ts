import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss'],
  providers: [UserService]
})
export class UserShowComponent implements OnInit {
  user: User;
  pageTitle: string;
  identity: any;
  token: string;
  status: string;
  message: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.pageTitle = "Mostrar usuario";
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._userService.userById(this.token, id).subscribe(
        res => {
          if (res.status == 'success') {
            this.user = res.user;
          } else {
            this.status = 'error';
            this.message = res.message;
          }
        },
        error => {
          console.log(error);
        }
      )
    });
  }
}
