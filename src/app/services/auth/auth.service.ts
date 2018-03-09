import { APIResponse } from './../../common/data-objects';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LogglyService } from 'ngx-loggly-logger';

@Injectable()
export class AuthService {

  url: string = environment.phpserver;

  constructor(private http: HttpClient, private router: Router, private loggly: LogglyService) {
    loggly.push({
      logglyKey: '0d4ba608-9a71-4b13-a7b1-c37d4d94c321',
      sendConsoleErrors: true, // Optional set true to send uncaught console errors
      tag: 'loggly-logger'
    });
  }

  login(payload): Observable<APIResponse> {

    return this.http.post<APIResponse>(this.url + '/login.php', payload)
      .pipe(
      tap(response => {
        if (response && response.status == 0) {
          let token = btoa(payload.username + ":" + payload.password);
          sessionStorage.setItem('token', token);

          sessionStorage.setItem('name', response.data);
        }
      }),
      catchError(this.handleError<APIResponse>('login'))
      );
  }


  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if (sessionStorage.getItem('token')) {
      return true;
    }

    return false;
  }

  private handleError<APIResponse>(operation = 'operation') {
    return (error: any): Observable<APIResponse> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      this.loggly.push(error);
      let result = new APIResponse(1, error.message);
      // Let the app keep running by returning an empty result.
      return of(result as any);
    };
  }
}
