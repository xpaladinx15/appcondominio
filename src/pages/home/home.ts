import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Descproblema } from '../descproblema/descproblema';
import { ToastController } from 'ionic-angular';
import { Chamadosabertos } from '../chamadosabertos/chamadosabertos';
import {AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categoria:any;
  res:any;
  desc:any;
  items: any;
  items2: any;
  items3: any;
  image:string;
  dados: any;
  senhadescripto:any;
  constructor(public navCtrl: NavController, public http: Http, public storage: Storage, private alertCtrl: AlertController, public toastCtrl: ToastController, public loadingController: LoadingController) {

  }



setAr(){
this.storage.set('categoria', 'ar');
this.navCtrl.push(Descproblema);
}

setCivil(){
this.storage.set('categoria', 'civil');
this.navCtrl.push(Descproblema);
}

setEletrica(){
this.storage.set('categoria', 'eletrica');
this.navCtrl.push(Descproblema);
}

setEquipamentos(){
this.storage.set('categoria', 'equipamentos');
this.navCtrl.push(Descproblema);
}

setLogica(){
this.storage.set('categoria', 'logica');
this.navCtrl.push(Descproblema);
}

setGeral(){
this.storage.set('categoria', 'geral');
this.navCtrl.push(Descproblema);
}

setLayout(){
this.storage.set('categoria', 'layout');
this.navCtrl.push(Descproblema);
}



presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Principais categorias para ar condicionado: Ajuste de saída de ar, Ajuste de temperatira e Alteração na programação.',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  presentToastCivil() {
      let toast = this.toastCtrl.create({
        message: 'Principais categorias para civil: Ajuste de parede/pilar, Ajuste no piso/rodapé, Solicitação de pintura, Ajuste no forro/teto e Hidráulica.',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
    }

    presentToastEletrica() {
        let toast = this.toastCtrl.create({
          message: 'Principais categorias para elétrica: Falta de energia, Problema com tomada e Troca de lâmpada.',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      }

      presentToastEquipamentos() {
          let toast = this.toastCtrl.create({
            message: 'Principais categorias para equipamentos: Filtro de água, Kentinha, Outros equipamentos e Projetor/Áudio e Vídeo.',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          toast.present();
        }

        presentToastLogica() {
            let toast = this.toastCtrl.create({
              message: 'Principais categorias para lógica: Novo ponto de rede e Problema com ponto de rede.',
              showCloseButton: true,
              closeButtonText: 'Ok'
            });
            toast.present();
          }

          presentToastGeral() {
              let toast = this.toastCtrl.create({
                message: 'Principais categorias para manutenção geral: Cadeiras, Mobiliário e Outros.',
                showCloseButton: true,
                closeButtonText: 'Ok'
              });
              toast.present();
            }


            presentToastMudancas() {
                let toast = this.toastCtrl.create({
                  message: 'Principais categorias para mudanças de layout: Solicitação de mudança e Solicitação de Projeto.',
                  showCloseButton: true,
                  closeButtonText: 'Ok'
                });
                toast.present();
              }

              loading(){
              this.navCtrl.push(Chamadosabertos);
              }



              presentConfirm() {
                let alert = this.alertCtrl.create({
                  title: 'Escolha uma opção:',
                  inputs: [
      {
        name: 'desc',
        placeholder: 'Descrição - não obrigatória'
      }
    ],
                  buttons: [

                    {
                      text: 'Incidente - É uma interrupção ou falha inesperada.',
                      handler: data3 => {
                        console.log('Buy clicked');

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


                                                              body2.append('loginid', this.items2.loginid);
                                                              console.log(this.items2.loginid);
                                                              body2.append('handle', this.items3.loginid);

                                                              body2.append('category', 'pcat:493349');
                                                              body2.append('tipo', 'I');
                                                              body2.append('desc', data3.desc);

                                                          let link2 = "https://apps.sicredi.com.br/systemstatus/services/public/v1/usdsuporteapoio";
                                                                this.http.post(link2, body2).map(res => res.json())
                                                                   .subscribe(data => {
                                                                     console.log(data);
                                                                     this.items3 = data;
                                                                     this.alerta(this.items3.loginid);
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
                    },
                    {
                      text: 'Requisição - É qualquer solicitação/contato pedido de informação ou dúvida',
                      handler: data3 => {
                        console.log('Buy clicked');

                        this.storage.get('ldap').then((val) => {
                        this.storage.get('senha').then((val2) => {
                        this.storage.get('categoria').then((val3) => {

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


                                                              body2.append('loginid', this.items2.loginid);
                                                              console.log(this.items2.loginid);
                                                              body2.append('handle', this.items3.loginid);

                                                              body2.append('category', 'pcat:483415');
                                                              body2.append('tipo', 'R');
                                                              body2.append('desc', data3.desc);

                                                          let link2 = "https://apps.sicredi.com.br/systemstatus/services/public/v1/usdsuporteapoio";
                                                                this.http.post(link2, body2).map(res => res.json())
                                                                   .subscribe(data => {
                                                                     console.log(data);
                                                                     this.items3 = data;
                                                                     this.alerta(this.items3.loginid);
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
                    },
                    {
                      text: 'Cancelar',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    }
                  ]
                });
                alert.present();
              }


              alerta(numero) {
                let alert = this.alertCtrl.create({
                  title: 'Numero de protocolo gerado: '+ numero,
                  buttons: ['Fechar']
                });
                alert.present();
              }

}
