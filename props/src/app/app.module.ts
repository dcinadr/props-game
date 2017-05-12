import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryEgDbService } from '../services/in-memory-eg-db.service';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Page2 } from '../pages/page2/page2';
import { MatchCardService } from '../services/match-card.service';
import { UserDataService } from '../services/user-data.service';
import { BettingModal } from '../pages/bettingModal/betting-modal';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

export const firebaseConfig = {
    apiKey: "AIzaSyCs25dhBpwgCyow88UI8ZrhJLtsQjtbtBg",
    authDomain: "props-155904.firebaseapp.com",
    databaseURL: "https://props-155904.firebaseio.com",
    storageBucket: "props-155904.appspot.com",
    messagingSenderId: "655279945221"
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

@NgModule({
    declarations: [
        MyApp,
        Home,
        Page2,
        BettingModal,
        ProgressBarComponent
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)//,
        //HttpModule,
        //InMemoryWebApiModule.forRoot(InMemoryEgDbService)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Home,
        Page2,
        BettingModal
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        MatchCardService, UserDataService]
})
export class AppModule { }
