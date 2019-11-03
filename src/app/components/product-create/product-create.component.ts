import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { Provider } from '../../models/Provider';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  providers: [
    ProductService,
    UserService,
    CategoryService,
    ProviderService
  ]
})
export class ProductCreateComponent implements OnInit {
  product: Product;
  pageTitle: string;
  status: string;
  message: string;
  token: string;
  filter: string;
  categories: Category[];
  filteredCategories: Category[];
  providers: Provider[];
  filteredProviders: Provider[];
  categoryName: string;
  providerName: string;

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _providerService: ProviderService
  ) {
    this.pageTitle = "Crear producto"
    this.token = this._userService.getToken();
    this.product = new Product(0, 0, 0, '', '', 0, '', '');
  }

  ngOnInit() {
    this.loadCategory();
    this.loadProvider();
  }

  loadCategory() {
    this._categoryService.categoryList(this.token).subscribe(
      res => {
        if (res.status == 'success') {
          this.categories = res.category;
          this.filteredCategories = this.categories;
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

  loadProvider() {
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

  onKeyupCategory() {
    this.filteredCategories = this.categories.filter(category => (
      category.name.toLocaleLowerCase().includes(this.filter.toLowerCase())) ||
      category.description.toLocaleLowerCase().includes(this.filter.toLowerCase()
    ));
  }
  onKeyupProvider() {
    this.filteredProviders = this.providers.filter(provider => (
      provider.name.toLocaleLowerCase().includes(this.filter.toLowerCase())
    ));
  }

  assignCategory(id: number, name: string){
    this.product.categoryId = id;
    this.categoryName = name;
    this.filter = '';
  }

  assignProvider(id: number, name: string){
    this.product.providerId = id;
    this.providerName = name;
    this.filter = '';
  }

  onSubmit(form) {
    this._productService.productCreate(this.token, this.product).subscribe(
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
