import { Injectable, Component, OnInit } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

/**
 * You must define this service as a 'provider' in app.component.js.
 */
@Injectable()
export class AppConfiguration {
    
    private _configUrl = 'app/config/config.json';
    
    private _configObject: Map<string, string>;

    constructor(private _http: Http) { 
        this.getConfigValues();
    }

    getConfigValue(key: string): string {
        console.log(">>> getConfigValue : key=" + key + ", configObject=" + JSON.stringify(this._configObject));
        let result;
        if (key != undefined) { 
            result = this._configObject.get(key);            
        }       
        console.log("<<< getConfigValue : result=" + result);
        return result;
    }
    
    private getConfigValues(): void {
        console.log(">>> getConfigValues : _configUrl=" + this._configUrl);
        this._http.get(this._configUrl)
            .map((response: Response) => response.json())
            .do(data => {
                this._configObject = this.jsonObjectToMap(data);
                console.log("configObject=" + this._configObject);
            })
            .catch(this.handleError)
            .subscribe();
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