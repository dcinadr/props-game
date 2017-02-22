import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { MatchCard } from '../models/match-card';

@Injectable()
export class MatchCardService {
    private matchCardUrl = 'api/matchCards';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private database = null;
    items: FirebaseListObservable<any[]>;

    constructor(private af: AngularFire) {    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getMatchCards(): Observable<any> { 
        return this.af.database.list('/matchCards');
    }
}
