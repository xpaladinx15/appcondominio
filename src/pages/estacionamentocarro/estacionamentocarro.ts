import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import CryptoJS from 'crypto-js';
/**
 * Generated class for the EstacionamentocarroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-estacionamentocarro',
  templateUrl: 'estacionamentocarro.html',
})
export class EstacionamentocarroPage {
marca:any;
modelo:any;
cor:any;
placa:any;
dados:any;
items2:any;
items3:any;
senhadescripto:any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, public navParams: NavParams, public loadingController: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacionamentocarroPage');
  }

  save(marca, modelo, cor, placa){

  this.storage.get('ldap').then((val) => {
  this.storage.get('senha').then((val2) => {
  this.storage.get('token').then((val3) => {

    this.senhadescripto  = CryptoJS.AES.decrypt(val2, 'condominio');
    val2 = this.senhadescripto.toString(CryptoJS.enc.Utf8);

  let loader = this.loadingController.create({
        content: "<b>Aguarde enquanto abrimos seu chamado!</b>"
      });
  loader.present();





        let body = new FormData();
            body.append('ldap', val);
            body.append('senha', val2);

        let link = "https://apps.sicredi.com.br/systemstatus/services/public/v1/usdlogin";
              this.http.post(link, body).map(res => res.json())
                 .subscribe(data => {
                   console.log(data);
                   this.items2 = data;

                   //alert(this.items2.loginid);

                   let body1 = new FormData();
                       body1.append('loginid', this.items2.loginid);
                       body1.append('ldap', val);

                   let link1 = "https://apps.sicredi.com.br/systemstatus/services/public/v1/usdusuariohandle";
                         this.http.post(link1, body1).map(res => res.json())
                            .subscribe(data => {
                              console.log(data);
                              this.items3 = data;
                              //alert(this.items3.loginid);

                              let body2 = new FormData();

                                  body2.append('ldap', val);
                                  body2.append('loginid', this.items2.loginid);
                                  body2.append('handle', this.items3.loginid);
                                  body2.append('marca', this.marca);
                                  body2.append('modelo', this.modelo);
                                  body2.append('cor', this.cor);
                                  body2.append('placa', this.placa);

                              let link2 = "https://apps.sicredi.com.br/systemstatus/services/public/v1/usdcadastracarro";
                                    this.http.post(link2, body2).map(res => res.json())
                                       .subscribe(data => {
                                         console.log(data);
                                         this.items3 = data;
                                         alert("Aberta a requisição: "+this.items3.loginid);
                                         loader.dismiss();
                                    },
                                    error => {
                                      console.log(error);
                                    });
                         },
                         error => {
                           console.log(error);
                         });
              },
              error => {
                console.log(error);
              });


  })
  })
  })


  }

}
