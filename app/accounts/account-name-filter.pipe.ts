import {  PipeTransform, Pipe } from 'angular2/core';
import { IAccount } from './account';

@Pipe({
    name: 'accountNameFilter'
})
export class AccountNameFilterPipe implements PipeTransform {

    transform(value: IAccount[], args: string[]): IAccount[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((account: IAccount) =>
            account.accountName.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}