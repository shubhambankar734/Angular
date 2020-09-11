import { Injectable } from '@angular/core';
import { Feedback } from '../Shared/feedback';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor( private http:HttpClient , private processhttpmsg : ProcessHTTPMsgService) { }
  submitFeedback(feedback : Feedback) : Observable<Feedback>{
    const httpOptions ={
      headers : new HttpHeaders({
          'Contant-type' : 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', feedback ,httpOptions).pipe(catchError(this.processhttpmsg.handleError));
  }
}
