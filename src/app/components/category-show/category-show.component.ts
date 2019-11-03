import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.scss'],
  providers: [
    CategoryService,
    UserService
  ]
})
export class CategoryShowComponent implements OnInit {
  category: Category;
  pageTitle: string;
  token: string;
  status: string;
  message: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.pageTitle = "Mostrar categoría";
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._categoryService.categoryById(this.token, id).subscribe(
        res => {
          if (res.status == 'success') {
            this.category = res.category;
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

