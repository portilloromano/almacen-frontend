import { Component, OnInit } from '@angular/core';
import { Movement } from '../../models/Movement';
import { MovementService } from '../../services/movement.service';
import { UserService } from '../../services/user.service';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-movement-create',
  templateUrl: './movement-create.component.html',
  styleUrls: ['./movement-create.component.scss'],
  providers: [
    MovementService,
    UserService,
    ProductService
  ]
})
export class MovementCreateComponent implements OnInit {
  movement: Movement;
  pageTitle: string;
  status: string;
  message: string;
  token: string;
  filter: string = '';
  products: Product[];
  productName: string;
  currentPage: number = 1;
  totalItems: number;
  maxSize: number = 5;
  itemsPerPage: number;
  totalPages: number;

  constructor(
    private _movementService: MovementService,
    private _userService: UserService,
    private _productService: ProductService
  ) {
    this.pageTitle = "Crear movimiento"
    this.token = this._userService.getToken();
    this.movement = new Movement(0, 0, 0, '', '', 0, '');
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

  onSubmit(form) {
    this._movementService.movementCreate(this.token, this.movement).subscribe(
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

  onKeyupProduct() {
    this.getProducts(this.token, this.currentPage, this.filter);
  }

  assignProduct(id: number, name: string) {
    this.movement.productId = id;
    this.productName = name;
    this.filter = '';
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getProducts(this.token, this.currentPage, this.filter);
  }
}
