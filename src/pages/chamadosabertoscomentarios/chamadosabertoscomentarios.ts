import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-page6',
  templateUrl: 'chamadosabertoscomentarios.html'
})
export class Chamadosabertoscomentarios {
items: any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {
    this.storage.get('cr').then((val) => {

    this.http.get("http://mti-portal.sicredi.net/noc-dev/app/chamadousd.php?cr="+val).map(res => res.json()).subscribe(data => {
            this.items = data;
            //alert(data);
          },
          error => {
            console.log(error);
          });

    })
  }

}
