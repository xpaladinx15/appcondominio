import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'page-page4',
  templateUrl: 'consultacatraca.html'
})
export class Consultacatraca {
  items3: any;
  dados: any;
  senhadescripto:any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {

  let loader = this.loadingController.create({
        content: "<b>Aguarde enquanto carregamos as informações de seu ponto!</b>"
      });
  loader.present();

  this.storage.get('ldap').then((val) => {
  this.storage.get('senha').then((val2) => {

    this.senhadescripto  = CryptoJS.AES.decrypt(val2, 'condominio');
    val2 = this.senhadescripto.toString(CryptoJS.enc.Utf8);

    this.dados= val+"/"+val2;
  let link = "https://mti-exec.sicredi.com.br/diariofechamento/phantomjslinux/bin/teste.php";
        this.http.post(link, this.dados).map(res => res.json())
           .subscribe(data => {

          this.items3 = data;
          loader.dismiss();
        },
        error => {
        loader.dismiss();
        alert("Falha de conexão com a rede");
          console.log(error);
        });


        })
        })


  }

}
