import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    public baseURL:string = "http://forecastingbilling.azurewebsites.net";

    public authentication: string = this.baseURL + "/auth";
    public searchUrl: string = this.baseURL +"/search/";
    public forecastingUrl: string = this.baseURL +"/forecasting";
    public billingUrl: string =this.baseURL + "/billing";
    public userUrl: string = this.baseURL + "/user/";
    
}