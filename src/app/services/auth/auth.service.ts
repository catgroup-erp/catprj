import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  url: string = environment.phpserver;

  constructor(private http: HttpClient) { }

  login(payload) {

    return this.http.post(this.url + '/login.php', payload)
    .map(response => {
      let result = response as any;

      console.log(result.status == "Success");
      if(result && result.status == "Success") {
        let token = btoa(payload.username + ":" + payload.password);
        sessionStorage.setItem('token', token);

        return true;
      }

      return false;
    });
  }

  test() {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', sessionStorage.getItem('token'));
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.get(this.url + '/test.php', httpOptions);
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  isLoggedIn() {
    if(sessionStorage.getItem('token')) {
      return true;
    }

    return false;
  }
}
