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
    
    private _configObject: Observable<Map<string, string>>;
    
    private _isInitialized: boolean = false;

    constructor(private _http: Http) { 
        this.getConfigValues();
    }

    getConfigValue(key: string): Observable<string> {
        console.log(">>> getConfigValue : key=" + key);
        let result: string;
        return this.getConfigValues().map(data => result = data.get(key));
    }
    
    private getConfigValues(): Observable<Map<string, string>> {
        console.log(">>> getConfigValues : _configUrl=" + this._configUrl);
        let result: Observable<Map<string, string>> = null;
        return this._http.get(this._configUrl)
            .map((response: Response) => response.json())
            .do(data => {
                result = Observable.of(this.jsonObjectToMap(data));                
                console.log("result=" + result);
                this._isInitialized = true;
            })
            .catch(this.handleError);            
    }      
    
    private jsonObjectToMap(jsonObject): Map<string, string> {
        console.log("jsonObjectToMap : jsonObject=" + jsonObject);
        let result = new Map<string, string>();
        for (var key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                console.log(key, jsonObject[key]);
                result.set(key, jsonObject[key]);
            }
        }        
        console.log("jsonToMap : result=" + result);
        return result;
    }    
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Config error');
    }    
}