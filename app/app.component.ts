import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';   // Load all features
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { AccountListComponent } from './accounts/account-list.component';
import { AccountService } from './accounts/account.service';
import { AppConfiguration } from './app.configuration';
import { WelcomeComponent } from './home/welcome.component';
import { AccountDetailComponent } from './accounts/account-detail.component';

@Component({
    selector: 'account-app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['Welcome']">Home</a></li>
                    <li><a [routerLink]="['Accounts']">Account List</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `,
    directives: [ROUTER_DIRECTIVES],
    providers: [AccountService,
                AppConfiguration,
                HTTP_PROVIDERS,
                ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/welcome', name: 'Welcome', component: WelcomeComponent, useAsDefault: true },
    { path: '/accounts', name: 'Accounts', component: AccountListComponent },
    { path: '/accountDetail', name: 'AccountDetail', component: AccountDetailComponent }
])
export class AppComponent {
    
    pageTitle: string = 'Account Management';
    
    constructor(private _configuration: AppConfiguration) { 
        this._configuration.getConfigValues().subscribe(); 
    }    
}