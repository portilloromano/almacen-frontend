import { Component, OnInit } from '@angular/core';
import { Movement } from '../../models/Movement';
import { MovementService } from '../../services/movement.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss'],
  providers: [
    MovementService,
    UserService
  ]
})
export class MovementListComponent implements OnInit {
  movements: Movement[];
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
    private _movementService: MovementService,
    private _userService: UserService
  ) {
    this.pageTitle = "Lista de movimientos"
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getMovements(this.token, this.currentPage, this.filter);
  }

  getMovements(token: string, currentPage: number, filter: string) {
    this._movementService.movementListSearch(token, String(currentPage), filter).subscribe(
      res => {
        if (res.status == 'success') {
          this.movements = res.movements;
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
    this.getMovements(this.token, this.currentPage, this.filter);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getMovements(this.token, this.currentPage, this.filter);
  }

}
