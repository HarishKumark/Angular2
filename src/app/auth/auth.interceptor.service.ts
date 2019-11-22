import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }
  
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
 
    request = request.clone({headers: request.headers.set('Key', '_xuWLv0pS5mL5OQo69rT6yRPaa5Ns0Nk2B2rMqjruc')});
	request = request.clone({headers: request.headers.set('Access-Control-Allow-Origin', '*')});
	
 
    return next.handle(request);
	}
}
