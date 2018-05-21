import { environment } from './../../../environments/environment';
import { Area, APIResponse, Project, WBS, PRJPLANH, PRJPOLAYOUT, PRJPOH } from './../../common/data-objects';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DataService {

  url: string = environment.phpserver;

  constructor(private http: HttpClient) { }

  getInit(): Observable<PRJPOH[]> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<PRJPOH[]>(this.url + "/init.php", httpOptions)
      .pipe(
      catchError(this.handleError<PRJPOH[]>('getInit', []))
      );
  }

  getAreas(): Observable<Area[]> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<Area[]>(this.url + "/areas.php", httpOptions)
      .pipe(
      catchError(this.handleError<Area[]>('getAreas', []))
      );
  }

  getProjects(area?: string): Observable<Project[]> {
    let params = new HttpParams();
    if (area)
      params = params.append('warea', area);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<Project[]>(this.url + "/projects.php", httpOptions)
      .pipe(
      catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  getPlans(area?: string): Observable<PRJPLANH[]> {
    let params = new HttpParams();
    if (area) {
      params = params.append('warea', area);
    }

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<PRJPLANH[]>(this.url + "/prjplanh.php", httpOptions)
      .pipe(
      catchError(this.handleError<PRJPLANH[]>('getPlans', []))
      );
  }

  getLayouts(area?: string): Observable<PRJPOLAYOUT[]> {
    let params = new HttpParams();
    if (area)
      params = params.append('warea', area);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<PRJPOLAYOUT[]>(this.url + "/layouts.php", httpOptions)
      .pipe(
      catchError(this.handleError<PRJPOLAYOUT[]>('getLayouts', []))
      );
  }

  getLayoutsv(area?: string, layout?: number): Observable<PRJPOLAYOUT[]> {
    let params = new HttpParams();
    if (area)
      params = params.append('warea', area);
    if (layout)
      params = params.append('wlayout', layout.toString());

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<PRJPOLAYOUT[]>(this.url + "/layoutsv.php", httpOptions)
      .pipe(
      catchError(this.handleError<PRJPOLAYOUT[]>('getLayoutsv', []))
      );
  }

  getWBS(area?: string, projid?: number): Observable<WBS[]> {
    let params = new HttpParams();

    if (area)
      params = params.append('warea', area);

    if (projid)
      params = params.append('wprojid', projid.toString());

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<WBS[]>(this.url + "/wbss.php", httpOptions)
      .pipe(
      catchError(this.handleError<WBS[]>('getWBS', []))
      );
  }

  getPONumbers(area?: string, projid?: number): Observable<any[]> {
    let params = new HttpParams();

    if (area)
      params = params.append('warea', area);

    if (projid)
      params = params.append('wprojid', projid.toString());

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/ponumber.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getPONumbers', []))
      );
  }

  getPORev(area: string, projid: number, ref: string): Observable<any[]> {
    let params = new HttpParams();

    if (area)
      params = params.append('warea', area);

    if (projid)
      params = params.append('wprojid', projid.toString());

    if (ref)
      params = params.append('wref', ref);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/porev.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getPORev', []))
      );
  }

  getReports(area: string, projid: number, ref: string): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wref', ref);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/poreports.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getReports', []))
      );
  }

  getPlanrt(area: string, projid: number, plan: number, polineuid: string, type: string): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wplan', plan.toString());
    params = params.append('wpolineuid', polineuid);
    params = params.append('wtype', type);


    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };

    return this.http.get<any[]>(this.url + "/planrt.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getPlantRT', []))
      );
  }

  getContractDates(): Observable<any[]> {
    let params = new HttpParams();


    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.get<any[]>(this.url + "/contractdates.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getContractDates', []))
      );
  }

  getPOMIGERR_V(area: string, projid: number, pouid: string, porev: number, wwhat: string): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wpouid', pouid);
    params = params.append('wporev', porev.toString());
    params = params.append('wwhat', wwhat);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/pomigerrv.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getPOMIGERR_V', []))
      );
  }

  checkNotPosted(area: string, projid: number): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/notposted.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('checkNotPosted', []))
      );
  }

  getPOData(area: string, projid: number, pouid: string, porev: number): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wpouid', pouid);
    params = params.append('wporev', porev.toString());

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/podata.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getPOData', []))
      );
  }

  getPOH(area: string, projid: number, pouid: string): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wpouid', pouid);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/prjpoh.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getPOH', []))
      );
  }

  getInvoiceSummary(area: string, projid: number, status: string, fromdate: string, todate: string): Observable<any> {

    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wstatus', status);
    params = params.append('wfromdate', fromdate);
    params = params.append('wtodate', todate);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any>(this.url + "/invoicesumm.php", httpOptions)
      .pipe(
      catchError(this.handleError<any>('getInvoiceSummary'))
      );
  }

  getPOITEMDIFF(area: string, projid: number, status: string, fromdate: string, todate: string): Observable<any> {

    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wstatus', status);
    params = params.append('wfromdate', fromdate);
    params = params.append('wtodate', todate);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any>(this.url + "/poitemdiff.php", httpOptions)
      .pipe(
      catchError(this.handleError<any>('getPOITEMDIFF'))
      );
  }

  getBudgetFormat(area: string, projid: number, status: string, asat: string, poref: string): Observable<any> {

    let params = new HttpParams();

    params = params.append('warea', area);
    if (projid) {
      params = params.append('wprojid', projid.toString());
    }

    params = params.append('wstatus', status);
    params = params.append('wasat', asat);
    params = params.append('wporef', poref);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any>(this.url + "/budgetformat.php", httpOptions)
      .pipe(
      catchError(this.handleError<any>('getBudgetFormat'))
      );
  }

  getInvoiceMega(area: string, projid: number, status: string, fromdate: string, todate: string): Observable<any> {

    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wstatus', status);
    params = params.append('wfromdate', fromdate);
    params = params.append('wtodate', todate);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any>(this.url + "/invoicemega.php", httpOptions)
      .pipe(
      catchError(this.handleError<any>('getInvoiceMega'))
      );
  }

  getProjectTotals(area: string, projid: number, ref: string, porev: number): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wref', ref);
    params = params.append('wporev', porev.toString());

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/projecttotals.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getProjectTotals', []))
      );
  }

  getPOErrors(area: string, projid: number, wperiod: string): Observable<any[]> {
    let params = new HttpParams();

    params = params.append('warea', area);
    params = params.append('wprojid', projid.toString());
    params = params.append('wperiod', wperiod);

    const httpOptions = {
      headers: this.getHeaders(),
      params: params
    };


    return this.http.get<any[]>(this.url + "/poerrors.php", httpOptions)
      .pipe(
      catchError(this.handleError<any[]>('getPOErrors', []))
      );
  }

  savePRJPOH(payload: string): Observable<APIResponse> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<APIResponse>(this.url + "/save/prjpoh.php", payload, httpOptions)
      .pipe(
      catchError(this.handleError<APIResponse>('savePRJPOH'))
      );
  }

  savePRJPOHStatus(payload: string): Observable<APIResponse> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<APIResponse>(this.url + "/save/prjpohstatus.php", payload, httpOptions)
      .pipe(
      catchError(this.handleError<APIResponse>('savePRJPOHStatus'))
      );
  }

  post(): Observable<APIResponse> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<APIResponse>(this.url + "/save/post.php", null, httpOptions)
      .pipe(
      catchError(this.handleError<APIResponse>('post'))
      );
  }

  updatePRJPOMIGERR(payload: string): Observable<APIResponse> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<APIResponse>(this.url + "/save/prjmigerr_update.php", payload, httpOptions)
      .pipe(
      catchError(this.handleError<APIResponse>('updatePRJPOMIGERR'))
      );
  }

  deletePO(payload: string): Observable<APIResponse> {
    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<APIResponse>(this.url + "/delete/deletepo.php", payload, httpOptions)
      .pipe(
      catchError(this.handleError<APIResponse>('deletePO'))
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