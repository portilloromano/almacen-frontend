import { Component, OnInit } from '@angular/core';
import { Provider } from '../../models/Provider';
import { ProviderService } from '../../services/provider.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss'],
  providers: [
    ProviderService,
    UserService
  ]
})
export class ProviderListComponent implements OnInit {
  providers: Provider[];
  pageTitle: string;
  token: string;
  status: string;
  message: string;
  filter: string;
  filteredProviders: Provider[];

  constructor(
    private _providerService: ProviderService,
    private _userService: UserService
  ) {
    this.pageTitle = "Lista de proveedores"
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._providerService.providerList(this.token).subscribe(
      res => {
        if (res.status == 'success') {
          this.providers = res.provider;
          this.filteredProviders = this.providers;
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
  
  onKeyup() {
    this.filteredProviders = this.providers.filter(provider => (
      provider.name.toLocaleLowerCase().includes(this.filter.toLowerCase())
    ));
  }
}
