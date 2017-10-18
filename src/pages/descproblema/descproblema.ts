import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'page-page2',
  templateUrl: 'descproblema.html'
})
export class Descproblema {
  min2:any;
  displayData : any;
  categoria:any;
  res:any;
  desc:any = '';
  cafe:any = '';
  andar:any = '';
  ramal:any = '';
  area:any = '';
  aux:any;
items: any;
items2: any;
items3: any;
image:string;
dados: any;
senhadescripto:any;
options: CameraOptions={
  quality: 20,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}


  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {
	alert('É necessário o preenchimento de todos os campos!');
  }


usuario(desc, cafe, area, andar, ramal){

this.storage.get('ldap').then((val) => {
this.storage.get('senha').then((val2) => {
this.storage.get('categoria').then((val3) => {

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
                                      body2.append('desc', this.desc);

                                      if(val3 == 'ar'){
                                      body2.append('cat', '27B50FEBB223DC40B296497DBCD2E9B8');
                                      }
                                      if(val3 == 'civil'){
                                      body2.append('cat', '0FBDA1905B26274FAAE77AB12A69EEC6');
                                      }
                                      if(val3 == 'eletrica'){
                                      body2.append('cat', 'F1A94A456EE8AB418ECEC339F81C21F6');
                                      }
                                      if(val3 == 'equipamentos'){
                                      body2.append('cat', '9602F3E61237E34FA3761FBB313A81BE');
                                      }
                                      if(val3 == 'logica'){
                                      body2.append('cat', 'EF3B2AB65049AF47A2EE1D519DFB1844');
                                      }
                                      if(val3 == 'geral'){
                                      body2.append('cat', 'D69991A1285C4C47A3AE2249DF730BB8');
                                      }
                                      if(val3 == 'layout'){
                                      body2.append('cat', '8017078EE49BC9438FF14922138EAAEB');
                                      }
                                      body2.append('local', this.cafe);
                                      body2.append('area', this.area);
                                      body2.append('andar', this.andar);
                                      body2.append('ramal', this.ramal);
                                      alert(this.cafe+" local");
                                  let link2 = "https://apps.sicredi.com.br/systemstatus/services/public/v1/usdcadastraproblema";
                                        this.http.post(link2, body2).map(res => res.json())
                                           .subscribe(data => {
                                             console.log(data);
                                             this.items3 = data;
                                             alert("Aberta a requisição: "+this.items3.loginid);
                                             loader.dismiss();

                                             let link = "https://mti-exec.sicredi.com.br/diariofechamento/upload/upload.php?inc="+this.items3.loginid;
                                            this.http.post(link, this.image)
                                            .subscribe(data => {
                                            console.log("Success"+data);
                                            },error => {
                                            console.log("Error");
                                            });

                                            let body3 = new FormData();
                                            body3.append('loginid', this.items2.loginid);
                                            body3.append('objectHandle', this.items3.loginid2);
                                            body3.append('inc', this.items3.loginid);

                                        let link3 = "https://apps.sicredi.com.br/systemstatus/services/public/v1/usdcomentario";
                                              this.http.post(link3, body3).map(res => res.json())
                                                 .subscribe(data => {
                                                   console.log(data);
                                                   this.items3 = data;

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
                  },
                  error => {
                    console.log(error);
                  });





})
})
})



}




async takePicture(): Promise<any>{
    try {
      this.image = "data:image/jpeg;base64," + await this.camera.getPicture(this.options);
    }
    catch(e) {
    alert(e);
    }
  }



}
