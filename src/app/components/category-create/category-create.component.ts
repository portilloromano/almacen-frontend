import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
  providers: [
    CategoryService,
    UserService
  ]
})
export class CategoryCreateComponent implements OnInit {
  category: Category;
  pageTitle: string;
  status: string;
  message: string;
  token: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService
  ) {
    this.pageTitle = "Crear categoría"
    this.token = this._userService.getToken();
    this.category = new Category(1, '', '', '', '');
  }

  ngOnInit() { }

  onSubmit(form) {
    this._categoryService.categoryCreate(this.token, this.category).subscribe(
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
