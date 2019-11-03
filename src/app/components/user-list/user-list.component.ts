import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  users: User[];
  pageTitle: string;
  token: string;
  status: string;
  message: string;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = "Lista de usuarios"
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._userService.userList(this.token).subscribe(
      res => {
        if (res.status == 'success') {
          this.users = res.user;
        } else {
          this.status = 'error';
          this.message = res.message;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
