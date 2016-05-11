System.register(['angular2/core', 'angular2/router', './account.service', './account-name-filter.pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, account_service_1, account_name_filter_pipe_1;
    var AccountListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (account_name_filter_pipe_1_1) {
                account_name_filter_pipe_1 = account_name_filter_pipe_1_1;
            }],
        execute: function() {
            AccountListComponent = (function () {
                function AccountListComponent(_accountService, _router, _routeParams) {
                    this._accountService = _accountService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.pageTitle = 'Account List';
                    this.imageWidth = 50;
                    this.imageMargin = 2;
                    this.listFilter = '';
                }
                AccountListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._accountService.getAccounts()
                        .subscribe(function (data) { return _this.accounts = data; }, function (error) { return _this.errorMessage = error; });
                };
                AccountListComponent.prototype.onNew = function () {
                    console.log(">>> onNew");
                    this._router.navigate(['AccountDetail']);
                };
                AccountListComponent.prototype.onDelete = function (accountId) {
                    var _this = this;
                    console.log(">>> onDelete : accountId=" + accountId);
                    this._accountService.deleteAccount(accountId)
                        .subscribe(function (data) { }, function (error) { return _this.errorMessage = error; }, function () {
                        console.log("Callback for deleteAccount");
                        var account = _this.accounts.find(function (a) { return a.accountId === accountId; });
                        var index = _this.accounts.indexOf(account);
                        _this.accounts.splice(index, 1);
                    });
                };
                AccountListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/accounts/account-list.component.html',
                        pipes: [account_name_filter_pipe_1.AccountNameFilterPipe],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [account_service_1.AccountService, router_2.Router, router_2.RouteParams])
                ], AccountListComponent);
                return AccountListComponent;
            }());
            exports_1("AccountListComponent", AccountListComponent);
        }
    }
});
//# sourceMappingURL=account-list.component.js.map