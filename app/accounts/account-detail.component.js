System.register(['angular2/core', 'angular2/router', './account', './account.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, account_1, account_service_1;
    var AccountDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (account_1_1) {
                account_1 = account_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            }],
        execute: function() {
            AccountDetailComponent = (function () {
                function AccountDetailComponent(_accountService, _router, _routeParams) {
                    this._accountService = _accountService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.pageTitle = 'Account Detail';
                    this.imageWidth = 50;
                    this.imageMargin = 2;
                }
                AccountDetailComponent.prototype.ngOnInit = function () {
                    if (!this.account) {
                        var id = +this._routeParams.get('id');
                        if (id) {
                            this.getAccount(id);
                        }
                        else {
                            this.account = new account_1.IAccount();
                        }
                    }
                };
                AccountDetailComponent.prototype.onSave = function () {
                    var _this = this;
                    this._accountService.saveAccount(this.account).subscribe(function (data) { }, function (error) { return _this.errorMessage = error; }, function () {
                        console.log("Callback for saveAccount() : account=" + JSON.stringify(_this.account));
                        _this.onBack();
                    });
                };
                AccountDetailComponent.prototype.onBack = function () {
                    this._router.navigate(['Accounts']);
                };
                AccountDetailComponent.prototype.getAccount = function (id) {
                    var _this = this;
                    this._accountService.getAccount(id)
                        .subscribe(function (data) { return _this.account = data; }, function (error) { return _this.errorMessage = error; });
                };
                AccountDetailComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/accounts/account-detail.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [account_service_1.AccountService, router_2.Router, router_2.RouteParams])
                ], AccountDetailComponent);
                return AccountDetailComponent;
            }());
            exports_1("AccountDetailComponent", AccountDetailComponent);
        }
    }
});
//# sourceMappingURL=account-detail.component.js.map