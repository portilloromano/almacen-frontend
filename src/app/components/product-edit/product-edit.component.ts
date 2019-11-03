import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { Provider } from '../../models/Provider';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  providers: [
    ProductService,
    UserService,
    CategoryService,
    ProviderService
  ]
})
export class ProductEditComponent implements OnInit {
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
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _providerService: ProviderService
  ) {
    this.token = this._userService.getToken();
    this.pageTitle = "Editar producto";
   }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._productService.productById(this.token, id).subscribe(
        res => {
          this.product = (res['product']);
          this.assignCategory(res.product.category.id, res.product.category.name);
          this.assignProvider(res.product.provider.id, res.product.provider.name);
        },
        error => {
          console.log(error);
        }
      )
    });
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
    this.product['category'] = id;
    this.categoryName = name;
    this.filter = '';
  }

  assignProvider(id: number, name: string){
    this.product['provider'] = id;
    this.providerName = name;
    this.filter = '';
  }

  onSubmit(form) {
    console.log(this.product);
    this._productService.productEdit(this.token, this.product).subscribe(
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
