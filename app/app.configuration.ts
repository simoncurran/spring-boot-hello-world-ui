import { Injectable, Component, OnInit } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppConfiguration implements OnInit {
    
    private _configUrl = 'config/config.json';
    
    private _configObject: Map<string, any>;

    constructor(private _http: Http) { }

    getConfigValue(key: string): string {
        console.log(">>> getConfigValue");
        let result;
        if (key != undefined) { 
            result = this._configObject.get(key);            
        }       
        return result;
    }
    
    ngOnInit(): void {
        console.log(">>> ngOnInit : _configUrl=" + this._configUrl);
        this._http.get(this._configUrl)
            .map((response: Response) => <Map<string, any>> response.json())
            .do(data => this._configObject = data)
            .catch(this.handleError);
    }      
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Config error');
    }    
}