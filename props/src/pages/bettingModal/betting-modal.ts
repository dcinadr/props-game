import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'page-betting-modal',
    templateUrl: 'betting-modal.html'
})
export class BettingModal {

    selectedOption: any;
    cardId: string;
    availableBalance: number = 1000;
    currentBet: number = 0;

    constructor(public params: NavParams, public viewCtrl: ViewController, public userDataService: UserDataService) {
        this.selectedOption = params.get('selectedOption');
        this.cardId = params.get('cardId');
    }

    cancelClicked(): void {
        this.viewCtrl.dismiss();
    }

    placeBetClicked(): void {
        let userid = localStorage.getItem('userid');
        this.userDataService.updateUserBet(userid, this.cardId, this.selectedOption.name, this.currentBet);
        this.viewCtrl.dismiss({ bet: this.currentBet });
    }

}