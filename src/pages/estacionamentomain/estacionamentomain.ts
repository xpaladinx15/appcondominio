import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { Estacionamentocadastro } from '../estacionamentocadastro/estacionamentocadastro';
import { Estacionamentolista } from '../estacionamentolista/estacionamentolista';
import { Estacionamentomapa } from '../estacionamentomapa/estacionamentomapa';
import { Estacionamentovagasreservadas } from '../estacionamentovagasreservadas/estacionamentovagasreservadas';
import { EstacionamentocarroPage } from '../estacionamentocarro/estacionamentocarro';
@Component({
  selector: 'page-estacionamentomain',
  templateUrl: 'estacionamentomain.html'
})
export class Estacionamentomain {
items: any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {
    this.storage.get('ldap').then((val) => {

    this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamento/"+val).map(res => res.json()).subscribe(data => {
          this.items = data;
          //alert(data);
        },
        error => {
          console.log(error);
        });

  })
  }


  liberavaga(){
  this.navCtrl.push(Estacionamentocadastro);
  }

  listavagasabertas(){
  this.navCtrl.push(Estacionamentolista);
  }

  vagasreservadas(){
  this.navCtrl.push(Estacionamentovagasreservadas);
  }

  cadastrarcarro(){
  this.navCtrl.push(EstacionamentocarroPage);
  }

  mapavagas(){
  this.navCtrl.push(Estacionamentomapa);
  }
}
