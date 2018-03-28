import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VotesPage } from './../pages/votes/votes';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VotesPage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VotesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
