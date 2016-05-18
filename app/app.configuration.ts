import { Injectable, Component, OnInit } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Subject, Subscription } from 'rxjs/Rx.d';

/**
 * You must define this service as a 'provider' in app.component.js.
 */
@Injectable()
export class AppConfiguration {
    
    private _configUrl = 'app/config/config.json';
    
    private _configObject: Map<string, string>;
    
    private _isInitialized: boolean = false;

    constructor(private _http: Http) {
        // this.getConfigValues().subscribe(
        //     data => this._configObject = data); 
    }

    // getConfigValue(key: string): Observable<string> {
    //     console.log(">>> getConfigValue : url=" + this._configUrl);
    //     return this.getConfigValues()
    //         .map(data => data.get(key))
    //         .do(data => console.log("<<< getConfigValue : result=" + data))
    //         .catch(this.handleError); 
    // }  
    
    getConfigValue(key: string): string {
        console.log(">>> getConfigValue : key=" + key);
        let result = this._configObject.get(key); 
        console.log("<<< getConfigValue : result=" + result);
        return result;
    }      
    
    getConfigValues(): Observable<Map<string, string>> {
        console.log(">>> getConfigValues : url=" + this._configUrl);
        return this._http.get(this._configUrl)
            .map((response: Response) => this.jsonObjectToMap(response.json()))
            .do(data => {
                this._configObject = data;
                console.log("<<< getConfigValues : configObject=" + this._configObject)
            })
            .catch(this.handleError);            
    }
    
    // private getConfigValues(): Observable<Map<string, string>> {
    //     console.log(">>> getConfigValues : url=" + this._configUrl);
    //     return this._http.get(this._configUrl)
    //         .map((response: Response) => this.jsonObjectToMap(response.json()))
    //         .do(data => {
    //             console.log("<<< getConfigValues : result=" + data)
    //         })
    //         .catch(this.handleError);            
    // }          
    
    private jsonObjectToMap(jsonObject): Map<string, string> {
        console.log("jsonObjectToMap : jsonObject=" + jsonObject);
        let result = new Map<string, string>();
        for (var key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                console.log(key, jsonObject[key]);
                result.set(key, jsonObject[key]);
            }
        }        
        console.log("jsonObjectToMap : result=" + result);
        return result;
    }    
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Config error');
    }    
}