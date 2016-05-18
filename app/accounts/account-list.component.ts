import { Component, OnInit }  from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteParams, Router } from 'angular2/router';
import { IAccount } from './account';
import { AccountService } from './account.service';
import { AccountNameFilterPipe } from './account-name-filter.pipe';

@Component({
    templateUrl: 'app/accounts/account-list.component.html',
    pipes: [AccountNameFilterPipe],
    directives: [ROUTER_DIRECTIVES]
})
export class AccountListComponent 
{
    pageTitle: string = 'Account List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    accounts: IAccount[]; 
    listFilter: string = '';

    constructor(private _accountService: AccountService,
        private _router: Router,
        private _routeParams: RouteParams) {    
    }

    ngOnInit(): void {
        this._accountService.getAccounts()
            .subscribe(
                data => this.accounts = data,
                error => this.errorMessage = <any>error,
                () => console.log(">>> AccountListComponent.ngOnInit <<<")                
            );
    }
    
    onNew(): void {
        console.log(">>> onNew");
        this._router.navigate(['AccountDetail']);
    }  
    
    onDelete(accountId): void {
        console.log(">>> onDelete : accountId=" + accountId);
        this._accountService.deleteAccount(accountId)
            .subscribe(
                data => {},
                error => this.errorMessage = <any>error,
                () => {
                    console.log("Callback for deleteAccount");
                    let account = this.accounts.find(a => a.accountId === accountId);
                    let index = this.accounts.indexOf(account);
                    this.accounts.splice(index, 1);     
                }
            );        
    }  
}
