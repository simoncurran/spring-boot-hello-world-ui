import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { IAccount } from './account';

import { AppConfiguration } from '../app.configuration';

/**
 * You must define this service as a 'provider' in app.component.js.
 */
@Injectable()
export class AccountService {
    
    private _accountUrl = 'http://localhost:8080/accounts'; // api/accounts/accounts.json';

    constructor(
        private _configuration: AppConfiguration,
        private _http: Http) { }

    getAccounts(): Observable<IAccount[]> {        
        console.log(">>> getAccounts");
        let url: string = null;
        
        let one: Observable<string> = this.getAccountServiceURL()
            .do(data => {
                url = data;
                console.log("url=" + url);
            })
            .take(1);
            
        let two: Observable<IAccount[]> = this._http.get(url)
                .map((response: Response) => <IAccount[]> response.json())
                .do(data => console.log('All Accounts retrieved successfully.'))
                .catch(this.handleError)
                .take(1);
                
        return one.concat(two);
    }
    
    // getAccounts(): Observable<IAccount[]> {        
    //     console.log(">>> getAccounts");
    //     return this._http.get(this._accountUrl)
    //         .map((response: Response) => <IAccount[]> response.json())
    //         .do(data => console.log('All Accounts retrieved successfully.'))
    //         .catch(this.handleError);
    // }    

    getAccount(id: number): Observable<IAccount> {
        console.log("account.service.base.url=" + this._configuration.getConfigValue("account.service.base.url"));
        console.log(">>> getAccount");
        if (id > 0) { 
            let url: string = null;
            return this.getAccountServiceURL()
                .do(data => {
                    url = data + "/" + id;
                    console.log("url=" + url);
                })
                .concat(this._http.get(url)
                    .map((response: Response) => <IAccount> response.json())
                    .do(data => console.log('Account: ' +  JSON.stringify(data)))
                    .catch(this.handleError));
        }       
    }

    saveAccount(account: IAccount): Observable<IAccount> {
        console.log(">>> saveAccount : account=" + JSON.stringify(account))
        let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*' });
        let options = new RequestOptions({ headers: headers });
        let url: string = null;
        let sAccount: string = JSON.stringify(account);
        if (account.accountId != undefined) {
            console.log("Updating existing Account : account=" + sAccount);
            return this.getAccountServiceURL()
                .do(data => {
                    url = data + "/" + account.accountId;
                    console.log("url=" + url);
                })                
                .concat(
                    this._http.put(url, JSON.stringify(account), options)
                    .map((response: Response) => <IAccount> response.json())
                    .do(data => console.log('Update result: ' +  JSON.stringify(data)))
                    .catch(this.handleError));                
                            
        }
        else {
            return this.getAccountServiceURL()
                .do(data => {
                    url = data;
                    console.log("url=" + url);
                })                 
                .concat(this._http.post(url, sAccount, options)
                    .map((response: Response) => <IAccount> response.json())
                    .do(data => console.log('Create result: ' +  JSON.stringify(data)))
                    .catch(this.handleError));                              
        }  
    }
    
    deleteAccount(id: number): Observable<Response> {
        console.log(">>> deleteAccount : account=" + id)
        let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*' });
        let options = new RequestOptions({ headers: headers });
        let url: string = null;
        if (id != undefined) {
            console.log("Deleting existing Account"); 
            return this.getAccountServiceURL()
                .do(data => {
                    url = data + "/" + id;
                    console.log("url=" + url);
                })                  
                .concat(this._http.delete(url, options)
                    .do(data => console.log('Delete result: ' +  JSON.stringify(data)))
                    .catch(this.handleError));                             
        }
    }    

    private handleError(error: Response) {
        // In a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data || { };
    }  
    
    // private getAccountServiceURL(): string {        
    //     return this._configuration.getConfigValue("account.service.base.url");
    //         //.map(data => data + "/accounts")
    //         //.do(data => console.log("getAccountServiceBaseURL callback : data=" + data)).returnValue()
    // }
    
    private getAccountServiceURL(): Observable<string> {        
        return this._configuration.getConfigValue("account.service.base.url")
            .map(data => data + "/accounts")
            .do(data => console.log("getAccountServiceBaseURL callback : data=" + data));
    }    
}