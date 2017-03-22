import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

//import { MatchCard } from '../../models/match-card';
import { MatchCardService } from '../../services/match-card.service';
import { BettingModal } from '../bettingModal/betting-modal';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home implements OnInit {

    matchCards: Observable<any>;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, private matchCardService: MatchCardService) {    }

    ngOnInit(): void {
        this.matchCards = this.matchCardService.getMatchCards().do(x => console.log(x));
    }

    betClicked(option, allOptions): void {
        let bettingModal = this.modalCtrl.create(BettingModal, { selectedOption: option });
        bettingModal.onDidDismiss(data => {
            if (data) {
                // resetting all options before setting the selected option
                for (let optionItem of allOptions) {
                    optionItem.result = 0;
                }
                option.result = data.bet;  // TODO - fix this because this isn't what we are calling result.  this is the users bet.  but there is not object for this in the data model yet
            }
        });
        bettingModal.present();
    }

}
