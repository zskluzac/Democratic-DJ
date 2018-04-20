import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyApp } from './app.component';
import { HostGuestPage } from '../pages/host-guest/host-guest';
import { GuestPage } from '../pages/guest/guest';
import { GuestSongListPage } from '../pages/guest-song-list/guest-song-list';
import { HostSongListPage } from '../pages/host-song-list/host-song-list';
import { AddSongPage } from '../pages/add-song/add-song';
import { FirebaseProvider } from "../providers/firebase/firebase"
import { SessionDataProvider } from '../providers/session-data/session-data';
import { HttpClientModule } from '@angular/common/http'


export const firebaseConfig = {
    apiKey: "AIzaSyBH06qobgXssEN8T3DUxrMIHHJnLUdJuOo",
    authDomain: "democraticdj-4982f.firebaseapp.com",
    databaseURL: "https://democraticdj-4982f.firebaseio.com",
    storageBucket: "democraticdj-4982f.appspot.com",
    messagingSenderId: "395147360380"
};

@NgModule({
  declarations: [
    MyApp,
    HostGuestPage,
    GuestPage,
    GuestSongListPage,
    HostSongListPage,
    AddSongPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HostGuestPage,
    GuestPage,
    GuestSongListPage,
    HostSongListPage,
    AddSongPage
  ],
  providers: [
    AddSongPage,
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    SessionDataProvider,
    HttpClientModule
  ]
})
export class AppModule {}
