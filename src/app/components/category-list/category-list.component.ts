import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [
    CategoryService,
    UserService
  ]
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  pageTitle: string;
  token: string;
  status: string;
  message: string;
  filter: string;
  filteredCategories: Category[];

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService
  ) {
    this.pageTitle = "Lista de categorías"
    this.token = this._userService.getToken();
  }

  ngOnInit() {
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

  onKeyup() {
    this.filteredCategories = this.categories.filter(category => (
      category.name.toLocaleLowerCase().includes(this.filter.toLowerCase())) ||
      category.description.toLocaleLowerCase().includes(this.filter.toLowerCase()
    ));
  }
}