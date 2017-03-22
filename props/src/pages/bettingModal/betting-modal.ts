import { Component, OnInit } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-betting-modal',
    templateUrl: 'betting-modal.html'
})
export class BettingModal {

    selectedOption: any;
    availableBalance: number = 1000;
    currentBet: number = 0;

    constructor(public params: NavParams, public viewCtrl: ViewController) {
        this.selectedOption = params.get('selectedOption');
    }

    cancelClicked(): void {
        this.viewCtrl.dismiss();
    }

    placeBetClicked(): void {
        this.viewCtrl.dismiss({ bet: this.currentBet });
    }

}