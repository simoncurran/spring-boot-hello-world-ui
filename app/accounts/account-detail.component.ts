import { Component, OnInit }  from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router } from 'angular2/router';
import { IAccount } from './account';
import { AccountService } from './account.service';

@Component({
    templateUrl: 'app/accounts/account-detail.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AccountDetailComponent 
{
    pageTitle: string = 'Account Detail';
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    account: IAccount; 

    constructor(private _accountService: AccountService,
        private _router: Router,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        if (!this.account) {
            let id = + this._routeParams.get('id');
            if (id) {
                this.getAccount(id);
            }
            else {
                this.account = new IAccount();
            }
        }
    }

    onSave(): void {
        this._accountService.saveAccount(this.account).subscribe(
            data => {},
            error => this.errorMessage = <any>error,            
            () => {                                                
                console.log("Callback for saveAccount() : account=" + JSON.stringify(this.account));
                this.onBack()
            }    
        );        
    }

    onBack(): void {
        this._router.navigate(['Accounts']);
    }

    getAccount(id: number): void {
        this._accountService.getAccount(id)
            .subscribe(
                data => this.account = data,
                error => this.errorMessage = <any>error
            );
    }
}