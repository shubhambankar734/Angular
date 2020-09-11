import { Component, OnInit , Inject } from '@angular/core';
import {Leader} from '../Shared/leader';
import {Leaders} from '../Shared/leaders';
import { LeaderService} from '../services/leader.service';
import { flyInOut , expand} from '../animation/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leader: Leader;
  leaders: Leader[];
  errMess : string;
  constructor(private leaderService:LeaderService , @Inject('BaseURL') private BaseURL) 
   { }

  ngOnInit() {
 this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader , errMess => this.errMess = errMess);
  this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders , errMess => this.errMess = errMess);
  }

}
