import { Injectable } from '@angular/core';
import { Config } from '../common/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MasterData, SearchRequest, ForecastingInfo } from '../model/projectInfo';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient, private _config: Config) { }

  uploadProjectInfo(formData:any): Observable<any> {
    debugger;
    let url = this._config.forecastingUrl + "/uploadinfo";    
    return this._http.post(url, formData, {reportProgress: true, observe: 'events'})
    
  }
  uploadFiles(formData:any): Observable<any> {
    debugger;
    let url = this._config.forecastingUrl + "/uploadFiles";    
    return this._http.post(url, formData, {reportProgress: true, observe: 'events'})
    
  }
  uploadInfo(): Observable<any> {

    // var auth = this.authenticate().subscribe((value:any) => {
    //   console.log(value);
    // });
    let url = this._config.forecastingUrl + "/uploadinfo1";
    let data1 ="test1"
    return this._http.post(url,data1);
  }
  getForecastData(data:SearchRequest) {
    debugger;    
    let url = this._config.forecastingUrl + "/getforecastingdetails";
    console.log(url);
    return this._http.post<ForecastingInfo[]>(url,data);    
  }
  getBillingData(data:SearchRequest) {
    debugger;    
    let url = this._config.billingUrl + "/getbillingdetails";
    console.log(url);
    return this._http.post<ForecastingInfo[]>(url,data);    
  }
}
