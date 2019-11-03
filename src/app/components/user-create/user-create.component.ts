import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit {
  user: User;
  pageTitle: string;
  status: string;
  message: string;
  token: string;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = "Crear usuario";
    this.user = new User(1, '', '', '', '', 'ROLE_USER', true, '', '');
    this.token = _userService.getToken();
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.userCreate(this.token, this.user).subscribe(
      res => {
        if (res.status == 'success') {
          this.status = 'success';
          this.message = res.message;
          form.reset();
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
