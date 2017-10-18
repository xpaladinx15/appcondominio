import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { Consultacatraca } from '../consultacatraca/consultacatraca';
import { Chamadosabertos } from '../chamadosabertos/chamadosabertos';
import { Login } from '../login/login';
import { Estacionamentomain } from '../estacionamentomain/estacionamentomain';
import { PedidoscopaPage } from '../pedidoscopa/pedidoscopa';
import { LoadingController } from 'ionic-angular';
import CryptoJS from 'crypto-js';


@Component({
  selector: 'page-page3',
  templateUrl: 'inicial.html'
})
export class Inicial {
  image:string;
  items: any;
  nome: any;
  ldap: any;
  items4: any;
  items3: any;
  items2: any;
  itemsestacionamento: any;
  contachamados: any;
  contachamadosconcluidos: any;
  contareservas: any;
  dados: any;
  dadosconsulta: any;
  today:any;
  dd:any;
  mm:any;
  yyyy:any;
  senhadescripto:any;

  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {
  this.storage.get('foto').then((val) => {
    this.image = "data:image/jpeg;base64," + val;
})

let loader = this.loadingController.create({
      content: "<b>Aguarde enquanto carregamos as informações de seu ponto!</b>"
    });
//loader.present();

this.storage.get('nome').then((val2) => {
this.storage.get('ldap').then((val3) => {
this.storage.get('senha').then((val4) => {
this.senhadescripto  = CryptoJS.AES.decrypt(val4, 'condominio');
val4 = this.senhadescripto.toString(CryptoJS.enc.Utf8);



  this.nome = val2;
  this.ldap = val3;

  this.dados= val3+"/"+val4;
  let link2 = "https://mti-exec.sicredi.com.br/diariofechamento/phantomjslinux/bin/teste.php";
      this.http.post(link2, this.dados).map(res => res.json())
         .subscribe(data => {
          this.items3 = data;
          //loader.dismiss();
        },
        error => {
          console.log(error);
        });






        this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamento/"+val3).map(res => res.json()).subscribe(data => {
                        this.itemsestacionamento  = data;
                        if(data == ""){
                        this.itemsestacionamento = [{"NUMERO_VAGA":"Não possui!"}];
                        }
                        //alert(data);
                        },
                        error => {
                          console.log(error);
                        });




                        this.today = new Date();
                        this.dd = this.today.getDate();
                        this.mm = this.today.getMonth()+1; //January is 0!
                        this.yyyy = this.today.getFullYear();
                        this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentocadastro1/"+this.yyyy+"-"+this.mm+"-"+this.dd+","+val3).map(res => res.json()).subscribe (data => {
                        console.log("Got Data"+data);
                        this.items4 = data;
                        this.contareservas = this.items4.length;

                        }, error => {
                         console.log("Error with Data");
                        });

    })
  })
})


  }

abrirchamado(){
  this.navCtrl.push(HomePage);
}

abrirconsulta(){
  this.navCtrl.push(Consultacatraca);
}

loading(){
this.navCtrl.push(Chamadosabertos);
}

estacionamento(){
this.navCtrl.push(Estacionamentomain);
}

pedidocopa(){
this.navCtrl.push(PedidoscopaPage);
}

logout(){
  this.storage.set('name', '');
  //this.navCtrl.push(PagePage);
  this.navCtrl.setRoot(Login);

}

doRefresh(refresher) {
this.storage.get('nome').then((val2) => {
this.storage.get('ldap').then((val3) => {
this.storage.get('senha').then((val4) => {
this.senhadescripto  = CryptoJS.AES.decrypt(val4, 'condominio');
val4 = this.senhadescripto.toString(CryptoJS.enc.Utf8);


  this.dadosconsulta= val3+"/"+val4;
  let link2 = "https://mti-exec.sicredi.com.br/diariofechamento/phantomjslinux/bin/teste.php";
    this.http.post(link2, this.dados).map(res => res.json())
       .subscribe(data => {
               this.items3 = data;
         refresher.complete();
      },
      error => {
        console.log(error);
      });




                  this.today = new Date();
                  this.dd = this.today.getDate();
                  this.mm = this.today.getMonth()+1; //January is 0!
                  this.yyyy = this.today.getFullYear();
                  this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentocadastro1/"+this.yyyy+"-"+this.mm+"-"+this.dd+","+val3).map(res => res.json()).subscribe (data => {
                  console.log("Got Data"+data);
                  this.items4 = data;
                  this.contareservas = this.items4.length;

                  }, error => {
                   console.log("Error with Data");
                  });

})
})
})

 }


}
