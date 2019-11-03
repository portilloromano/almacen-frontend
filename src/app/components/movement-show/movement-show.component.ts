import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movement } from '../../models/Movement';
import { MovementService } from '../../services/movement.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movement-show',
  templateUrl: './movement-show.component.html',
  styleUrls: ['./movement-show.component.scss'],
  providers: [
    MovementService,
    UserService
  ]
})
export class MovementShowComponent implements OnInit {
  movement: Movement;
  pageTitle: string;
  token: string;
  status: string;
  message: string;

  constructor(
    private _movementService: MovementService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {
    this.token = this._userService.getToken();
    this.pageTitle = "Mostrar movimiento";
   }

   ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._movementService.movementById(this.token, id).subscribe(
        res => {
          if (res.status == 'success') {
            this.movement = res.movement;
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
