import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
  providers: [
    ProductService,
    UserService
  ]
})
export class ProductShowComponent implements OnInit {
  product: Product;
  pageTitle: string;
  token: string;
  status: string;
  message: string;

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.pageTitle = "Mostrar producto";
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._productService.productById(this.token, id).subscribe(
        res => {
          if (res.status == 'success') {
            this.product = res.product;
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
