import { Component, OnInit , Inject } from '@angular/core';
import {Dish} from '../Shared/dish'
import { DishService } from '../services/dish.service'
import { flyInOut ,expand } from '../animation/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})

export class MenuComponent implements OnInit {

  constructor(private dishService : DishService ,  @Inject('BaseURL') private BaseURL ) { }
  dishes: Dish[] ;
  errMess : string;
    ngOnInit() {
      this.dishService.getDishes().
      subscribe(dishes => this.dishes = dishes , errMess => this.errMess = <any>errMess);
  }
 
}