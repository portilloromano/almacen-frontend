import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  pageTitle: string;
  identity: any;

  constructor(
    private _userService: UserService
  ) { 
    this.pageTitle = 'Inicio';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

}
