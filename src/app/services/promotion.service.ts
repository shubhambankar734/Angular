import { Injectable , Inject } from '@angular/core';
import { Promotion } from '../Shared/promotion';
import{ PROMOTIONS } from '../Shared/promotions';
import { resolve } from 'url';
import { Observable, of } from 'rxjs';
import { delay,catchError , map} from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL +'promotions').pipe(catchError(this.processhttpservice.handleError));
    
  }
  getPromotion(id : string) : Observable<Promotion>{
    return this.http.get<Promotion>( baseURL + 'promotions/'+ id).pipe(catchError(this.processhttpservice.handleError));
  }
  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0])).pipe(catchError(this.processhttpservice.handleError));
    
  }
  constructor(private processhttpservice : ProcessHTTPMsgService, private http:HttpClient , @Inject('BaseURL') private BasaURL ) { }
}
