import { environment } from './../../../environments/environment';
import { Area, APIResponse, Project, WBS, PRJPLANH, PRJPOLAYOUT } from './../../common/data-objects';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DataService {

  url: string = environment.phpserver;

  constructor(private http: HttpClient) { }

  getAreas (): Observable<Area[]> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<Area[]>(this.url + "/areas.php", httpOptions)
      .pipe(
        tap(areas => console.log(`Fetched areas.`)),
        catchError(this.handleError<Area[]>('getAreas', []))
      );
  }

  getProjects (area?: string): Observable<Project[]> {
    let params = new HttpParams();
    if(area)
      params = params.append('warea', area);
      
    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<Project[]>(this.url + "/projects.php", httpOptions)
      .pipe(
        tap(areas => console.log(`Fetched projects.`)),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  getPlans(area?: string): Observable<PRJPLANH[]> {
    let params = new HttpParams();
    if(area){
      params = params.append('warea', area);
    }
      
    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<PRJPLANH[]>(this.url + "/prjplanh.php", httpOptions)
      .pipe(
        tap(areas => console.log(`Fetched plans.`)),
        catchError(this.handleError<PRJPLANH[]>('getPlans', []))
      );
  }

  getLayouts(area?: string): Observable<PRJPOLAYOUT[]> {
    let params = new HttpParams();
    if(area)
      params = params.append('warea', area);
      
    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<PRJPOLAYOUT[]>(this.url + "/layouts.php", httpOptions)
      .pipe(
        tap(areas => console.log(`Fetched layouts.`)),
        catchError(this.handleError<PRJPOLAYOUT[]>('getLayouts', []))
      );
  }

  getWBS (area?: string, projid?: number): Observable<WBS[]> {
    let params = new HttpParams();

    if(area)
      params = params.append('warea', area);

    if(projid)
      params = params.append('wprojid', projid.toString());

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<WBS[]>(this.url + "/wbss.php", httpOptions)
      .pipe(
        tap(areas => console.log(`Fetched wbs.`)),
        catchError(this.handleError<WBS[]>('getWBS', []))
      );
  }

  savePRJPOH(payload: string): Observable<APIResponse> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<APIResponse>(this.url + "/save/prjpoh.php", payload, httpOptions)
      .pipe(
        tap(response => console.log(response.message)),
        catchError(this.handleError<APIResponse>('savePRJPOH'))
      );
  }


  private getHeaders(): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', sessionStorage.getItem('token'));
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    return httpHeaders;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}