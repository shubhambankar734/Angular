import { Injectable } from '@angular/core';
import { Leader} from '../Shared/leader';
import { Leaders } from '../Shared/leaders';
import { resolve } from 'url';
import { Observable, of } from 'rxjs';
import { delay, catchError , map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { baseURL } from '../Shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeader(id : string): Observable<Leader>{
    return this.http.get<Leader>( baseURL + 'leadership/' + id).pipe(catchError(this.processhttpservice.handleError));
  }
  getLeaders() : Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processhttpservice.handleError));
  }
  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0])).pipe(catchError(this.processhttpservice.handleError));
  }
  constructor( private processhttpservice : ProcessHTTPMsgService , private http:HttpClient) { }
}
