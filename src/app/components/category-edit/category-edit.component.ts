import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
  providers: [
    CategoryService,
    UserService
  ]
})
export class CategoryEditComponent implements OnInit {
  category: Category;
  pageTitle: string;
  status: string;
  message: string;
  token: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) { 
    this.token = this._userService.getToken();
    this.pageTitle = "Editar categoría";
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._categoryService.categoryById(this.token, id).subscribe(
        res => {
          this.category = (res['category']);
        },
        error => {
          console.log(error);
        }
      )
    });
  }

  onSubmit(form) {
    this._categoryService.categoryEdit(this.token, this.category).subscribe(
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
