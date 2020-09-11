import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Observable , of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
import { map , catchError } from 'rxjs/operators';
import { Http } from '@angular/http'; 
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient , private processHTTPMsgService:ProcessHTTPMsgService ) { }
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
  putDish(dish : Dish) : Observable<Dish>{
    const httpOptions ={
      headers : new HttpHeaders({
          'Contant-type' : 'application/json'
      })
    };
   return this.http.put<Dish>(baseURL +'dishes/'+dish.id , dish,httpOptions).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
