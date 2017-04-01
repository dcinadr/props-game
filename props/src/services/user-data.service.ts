import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDataService {
    constructor(private af: AngularFire) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getUser(userid: string): Observable<any> {
        return this.af.database.object('/users/' + userid);
    }

    updateUserBet(userid: string, betid: string, selectedOption: string, betAmount: number): void {
        this.af.database.list('/users/' + userid + '/bets').update(betid, { selectedOption: selectedOption, amount: betAmount });
    }
}