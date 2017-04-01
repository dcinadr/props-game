import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/single';

//import { MatchCard } from '../../models/match-card';
import { MatchCardService } from '../../services/match-card.service';
import { UserDataService } from '../../services/user-data.service';
import { BettingModal } from '../bettingModal/betting-modal';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home implements OnInit {

    matchCards: Observable<any>;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController,
        private matchCardService: MatchCardService, private userDataService: UserDataService) { }

    ngOnInit(): void {
        let userid = localStorage.getItem('userid');
        let user: any;
        this.userDataService.getUser(userid)
            .take(1)
            .toPromise()
            .then(user => {
                this.matchCards = this.matchCardService.getMatchCards()
                    .map(cards => {
                        // note: not sure why we need to map again but it currently doesn't work otherwise
                        return cards.map(card => { 
                            if (!user.bets) {
                                return card;
                            }
                            let bet = user.bets[card.id];
                            if (!bet) {
                                return card;
                            }
                            // TODO - give options id so we aren't selecting option based on name (cause the name can change)
                            card.options.filter(x => x.name === bet.selectedOption)[0].result = bet.amount;   
                            return card;
                        });
                    });
            });        
    }

    betClicked(cardId, option, allOptions): void {
        let bettingModal = this.modalCtrl.create(BettingModal, { cardId: cardId, selectedOption: option });
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
