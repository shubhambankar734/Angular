import { Component, OnInit , Inject } from '@angular/core';

import {DishService} from '../services/dish.service';
import {Dish} from '../Shared/dish';
import {PromotionService} from '../services/promotion.service';
import {Promotion} from '../Shared/promotion';
import {Leader} from '../Shared/leader';
import {LeaderService} from '../services/leader.service';
import { flyInOut ,expand } from '../animation/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion : Promotion;
  leader: Leader;
  dishErrMess :string;
  dishErrMess1 :string;
  dishErrMess2 :string;
  constructor(private dishService: DishService , private promotionService : PromotionService, private leaderService: LeaderService , @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish =>this.dish = dish , dishErrMess =>this.dishErrMess = dishErrMess );
    this.promotionService.getFeaturedPromotion().subscribe(promotion =>this.promotion = promotion , dishErrMess1 =>this.dishErrMess1 = dishErrMess1);
     this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader , dishErrMess2 =>this.dishErrMess2 = dishErrMess2);
  }

}
