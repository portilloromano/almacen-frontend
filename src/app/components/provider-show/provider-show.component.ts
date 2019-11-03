import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Provider } from '../../models/Provider';
import { ProviderService } from '../../services/provider.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-provider-show',
  templateUrl: './provider-show.component.html',
  styleUrls: ['./provider-show.component.scss'],
  providers: [
    ProviderService,
    UserService
  ]
})
export class ProviderShowComponent implements OnInit {
  provider: Provider;
  pageTitle: string;
  token: string;
  status: string;
  message: string;

  constructor(
    private _providerService: ProviderService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.pageTitle = "Mostrar proveedor";
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._providerService.providerById(this.token, id).subscribe(
        res => {
          if (res.status == 'success') {
            this.provider = res.provider;
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
