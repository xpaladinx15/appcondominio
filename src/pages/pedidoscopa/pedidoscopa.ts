import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Inicial } from '../inicial/inicial';
/**
 * Generated class for the PedidoscopaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pedidoscopa',
  templateUrl: 'pedidoscopa.html',
})
export class PedidoscopaPage {
sala:any = 'D201';
cafe:any = 0;
agua:any = 0;
copeira:any;
dados:any;
today:any;
dd:any;
mm:any;
yyyy:any;
aux:any;
  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoscopaPage');
  }

  save(sala, cafe, agua){



          let body = new FormData();
              body.append('sala', this.sala);
              body.append('cafe', this.cafe);
              body.append('agua', this.agua);
              body.append('copeira', 'sim');
              body.append('concluido', 'nao');
              body.append('andar', '2');
              body.append('torre', 'd');

              this.today = new Date();
              this.dd = this.today.getDate();
              this.mm = this.today.getMonth()+1; //January is 0!
              this.yyyy = this.today.getFullYear();
              this.aux = this.yyyy+"-"+this.mm+"-"+this.dd;
              //body.append('ped_hora', this.aux);
              body.append('dif', '1000');



          let link = "https://apps.sicredi.com.br/systemstatus/services/public/v1/calendariocopa";
                this.http.post(link, body).map(res => res.json())
                   .subscribe(data => {
                     console.log(data);
                     alert("Pedido efetuado com sucesso!");
                     this.navCtrl.push(Inicial);
                },
                error => {
                  console.log(error);
                   alert("Não foi possivel concluir o seu pedido!");
                });


  }

  chamacopeira(sala){



          let body = new FormData();
              body.append('sala', this.sala);
              body.append('cafe', '0');
              body.append('agua', '0');
              body.append('copeira', 'sim');
              body.append('concluido', 'nao');
              body.append('andar', '2');
              body.append('torre', 'd');

              this.today = new Date();
              this.dd = this.today.getDate();
              this.mm = this.today.getMonth()+1; //January is 0!
              this.yyyy = this.today.getFullYear();
              this.aux = this.yyyy+"-"+this.mm+"-"+this.dd;
              //body.append('ped_hora', this.aux);
              body.append('dif', '1000');



          let link = "https://apps.sicredi.com.br/systemstatus/services/public/v1/calendariocopa";
                this.http.post(link, body).map(res => res.json())
                   .subscribe(data => {
                     console.log(data);
                     alert("Pedido efetuado com sucesso!");
                     this.navCtrl.push(Inicial);
                },
                error => {
                  console.log(error);
                   alert("Não foi possivel concluir o seu pedido!");
                });


  }

}
