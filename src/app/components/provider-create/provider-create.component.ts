import { Component, OnInit } from '@angular/core';
import { Provider } from '../../models/Provider';
import { ProviderService } from '../../services/provider.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-provider-create',
  templateUrl: './provider-create.component.html',
  styleUrls: ['./provider-create.component.scss'],
  providers: [
    ProviderService,
    UserService
  ]
})
export class ProviderCreateComponent implements OnInit {
  provider: Provider;
  pageTitle: string;
  status: string;
  message: string;
  token: string;

  constructor(
    private _providerService: ProviderService,
    private _userService: UserService
  ) { 
    this.pageTitle = "Crear proveedor"
    this.token = this._userService.getToken();
    this.provider = new Provider(1, '', '', '', '', '','');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._providerService.providerCreate(this.token, this.provider).subscribe(
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
