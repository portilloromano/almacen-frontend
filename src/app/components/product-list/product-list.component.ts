import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [
    ProductService,
    UserService
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  pageTitle: string;
  token: string;
  status: string;
  message: string;
  filter: string = '';
  currentPage: number = 1;
  totalItems: number;
  maxSize: number = 5;
  itemsPerPage: number;
  totalPages: number;

  constructor(
    private _productService: ProductService,
    private _userService: UserService
  ) {
    this.pageTitle = "Lista de productos"
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getProducts(this.token, this.currentPage, this.filter);
  }

  getProducts(token: string, currentPage: number, filter: string) {
    this._productService.productListSearch(token, String(currentPage), filter).subscribe(
      res => {
        if (res.status == 'success') {
          this.products = res.products;
          this.totalItems = res.total_items;
          this.itemsPerPage = res.items_per_page;
          this.totalPages = res.total_pages;
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
    this.getProducts(this.token, this.currentPage, this.filter);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getProducts(this.token, this.currentPage, this.filter);
  }
}
