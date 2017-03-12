import { Component, OnInit } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component({
    selector: 'page-betting-modal',
    templateUrl: 'betting-modal.html'
})
export class BettingModal {

    selectedOption: string = "Cleveland Indians";
    availableBalance: number = 1000;
    currentBet: number = 0;

    constructor(public navParams: NavParams) { }

    

}