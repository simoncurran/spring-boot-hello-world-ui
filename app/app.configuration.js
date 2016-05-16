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
    var AppConfiguration;
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
            /**
             * You must define this service as a 'provider' in app.component.js.
             */
            AppConfiguration = (function () {
                function AppConfiguration(_http) {
                    this._http = _http;
                    this._configUrl = 'app/config/config.json';
                    this._isInitialized = false;
                    this.getConfigValues();
                }
                AppConfiguration.prototype.getConfigValue = function (key) {
                    console.log(">>> getConfigValue : key=" + key);
                    var result;
                    return this.getConfigValues().map(function (data) { return result = data.get(key); });
                };
                AppConfiguration.prototype.getConfigValues = function () {
                    var _this = this;
                    console.log(">>> getConfigValues : _configUrl=" + this._configUrl);
                    var result = null;
                    return this._http.get(this._configUrl)
                        .map(function (response) { return response.json(); })
                        .do(function (data) {
                        result = Observable_1.Observable.of(_this.jsonObjectToMap(data));
                        console.log("result=" + result);
                        _this._isInitialized = true;
                    })
                        .catch(this.handleError);
                };
                AppConfiguration.prototype.jsonObjectToMap = function (jsonObject) {
                    console.log("jsonObjectToMap : jsonObject=" + jsonObject);
                    var result = new Map();
                    for (var key in jsonObject) {
                        if (jsonObject.hasOwnProperty(key)) {
                            console.log(key, jsonObject[key]);
                            result.set(key, jsonObject[key]);
                        }
                    }
                    console.log("jsonToMap : result=" + result);
                    return result;
                };
                AppConfiguration.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Config error');
                };
                AppConfiguration = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppConfiguration);
                return AppConfiguration;
            }());
            exports_1("AppConfiguration", AppConfiguration);
        }
    }
});
//# sourceMappingURL=app.configuration.js.map