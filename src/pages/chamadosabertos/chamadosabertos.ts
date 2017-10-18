import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { Chamadosabertoscomentarios } from '../chamadosabertoscomentarios/chamadosabertoscomentarios';
@Component({
  selector: 'page-page5',
  templateUrl: 'chamadosabertos.html'
})
export class Chamadosabertos {
items: any;
items2: any;
dados: any;
teste:any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {
this.storage.get('nome').then((val2) => {

this.dados=val2;
let link = "http://mti-portal.sicredi.net/noc-dev/app/consultachamadosusd.php";
      this.http.post(link, this.dados).map(res => res.json())
         .subscribe(data => {
          this.items = data;
          if(this.items==""){
          this.teste = "Nenhuma chamado aberto!";
          }
        },
        error => {
          console.log(error);
        });

        })
  }

  alert(incidente){
  this.storage.set('cr', incidente);
  this.navCtrl.push(Chamadosabertoscomentarios);
  }

}
