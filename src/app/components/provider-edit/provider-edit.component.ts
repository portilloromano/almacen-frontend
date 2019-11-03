import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Provider } from '../../models/Provider';
import { ProviderService } from '../../services/provider.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.scss'],
  providers: [
    ProviderService,
    UserService
  ]
})
export class ProviderEditComponent implements OnInit {
  provider: Provider;
  pageTitle: string;
  status: string;
  message: string;
  token: string;

  constructor(
    private _providerService: ProviderService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { 
    this.token = this._userService.getToken();
    this.pageTitle = "Editar proveedor";
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._providerService.providerById(this.token, id).subscribe(
        res => {
          this.provider = (res['provider']);
        },
        error => {
          console.log(error);
        }
      )
    });
  }

  onSubmit(form) {
    this._providerService.providerEdit(this.token, this.provider).subscribe(
      res => {
        if (res.status == 'success') {
          this.status = 'success';
          this.message = res.message;
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
