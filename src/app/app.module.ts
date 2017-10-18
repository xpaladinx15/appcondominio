import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { Descproblema } from '../pages/descproblema/descproblema';
import { Inicial } from '../pages/inicial/inicial';
import { Consultacatraca } from '../pages/consultacatraca/consultacatraca';
import { Chamadosabertos } from '../pages/chamadosabertos/chamadosabertos';
import { Chamadosabertoscomentarios } from '../pages/chamadosabertoscomentarios/chamadosabertoscomentarios';
import { Estacionamentomain } from '../pages/estacionamentomain/estacionamentomain';
import { Estacionamentocadastro } from '../pages/estacionamentocadastro/estacionamentocadastro';
import { Estacionamentolista } from '../pages/estacionamentolista/estacionamentolista';
import { Estacionamentomapa } from '../pages/estacionamentomapa/estacionamentomapa';
import { Estacionamentovagasreservadas } from '../pages/estacionamentovagasreservadas/estacionamentovagasreservadas';
import { PedidoscopaPage } from '../pages/pedidoscopa/pedidoscopa';
import { EstacionamentocarroPage } from '../pages/estacionamentocarro/estacionamentocarro';
import {Camera} from '@ionic-native/camera';
import { NgCalendarModule  } from 'ionic2-calendar';
import { NgModule, LOCALE_ID } from '@angular/core';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Descproblema,
    Inicial,
    Consultacatraca,
    Chamadosabertos,
    Chamadosabertoscomentarios,
    Estacionamentomain,
    Estacionamentocadastro,
    Estacionamentomapa,
    Estacionamentolista,
    Estacionamentovagasreservadas,
    PedidoscopaPage,
    EstacionamentocarroPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Descproblema,
    Inicial,
    Consultacatraca,
    Chamadosabertos,
    Chamadosabertoscomentarios,
    Estacionamentomain,
    Estacionamentocadastro,
    Estacionamentolista,
    Estacionamentomapa,
    Estacionamentovagasreservadas,
    PedidoscopaPage,
    EstacionamentocarroPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
