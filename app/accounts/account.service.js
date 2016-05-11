System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var AccountService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            AccountService = (function () {
                function AccountService(_http) {
                    this._http = _http;
                    this._accountUrl = 'http://localhost:8080/accounts'; // api/accounts/accounts.json';
                }
                AccountService.prototype.getAccounts = function () {
                    console.log(">>> getAccounts");
                    return this._http.get(this._accountUrl)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log('All Accounts retrieved successfully.'); })
                        .catch(this.handleError);
                };
                AccountService.prototype.getAccount = function (id) {
                    console.log(">>> getAccount");
                    if (id > 0) {
                        var url = this._accountUrl + "/" + id;
                        console.log("url=" + url);
                        return this._http.get(url)
                            .map(function (response) { return response.json(); })
                            .do(function (data) { return console.log('Account: ' + JSON.stringify(data)); })
                            .catch(this.handleError);
                    }
                };
                AccountService.prototype.saveAccount = function (account) {
                    console.log(">>> saveAccount : account=" + JSON.stringify(account));
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    if (account.accountId != undefined) {
                        var url = this._accountUrl + "/" + account.accountId;
                        console.log("Updating existing Account : url=" + url);
                        return this._http.put(url, JSON.stringify(account), options)
                            .map(function (response) { return response.json(); })
                            .do(function (data) { return console.log('Update result: ' + JSON.stringify(data)); })
                            .catch(this.handleError);
                    }
                    else {
                        var sAccount = JSON.stringify(account);
                        console.log("Creating new Account : account=" + sAccount);
                        return this._http.post(this._accountUrl, sAccount, options)
                            .map(function (response) { return response.json(); })
                            .do(function (data) { return console.log('Create result: ' + JSON.stringify(data)); })
                            .catch(this.handleError);
                    }
                };
                AccountService.prototype.deleteAccount = function (id) {
                    console.log(">>> deleteAccount : account=" + id);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    if (id != undefined) {
                        var url = this._accountUrl + "/" + id;
                        console.log("Deleting existing Account : url=" + url);
                        return this._http.delete(url, options)
                            .do(function (data) { return console.log('Delete result: ' + JSON.stringify(data)); })
                            .catch(this.handleError);
                    }
                };
                AccountService.prototype.handleError = function (error) {
                    // In a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                AccountService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body.data || {};
                };
                AccountService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AccountService);
                return AccountService;
            }());
            exports_1("AccountService", AccountService);
        }
    }
});
//# sourceMappingURL=account.service.js.map