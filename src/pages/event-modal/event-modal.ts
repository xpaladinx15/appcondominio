import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
dados:any;
items:any;
items2:any;
items3:any;
aux: any;
splitted: any;
date:any;
day:any;
monthIndex:any;
year:any;
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.event.allDay = true;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {

    this.storage.get('ldap').then((val) => {

            this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamento/"+val).map(res => res.json()).subscribe (data => {
            this.items2 = data;
            if(data!=""){
				this.date = new Date(this.event.startTime);
				this.day = this.date.getDate();
				this.monthIndex = this.date.getMonth()+1;
				this.year = this.date.getFullYear();

            this.aux = this.year+"-"+this.monthIndex+"-"+this.day;

            this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentoreservado/"+this.aux+","+this.items2[0].NUMERO_VAGA).map(res => res.json()).subscribe (data => {
            this.items3 = data;
            if(this.items3 ==""){
            let body = new FormData();
                body.append('vaga', this.items2[0].NUMERO_VAGA);
                body.append('dataini', this.aux);
                body.append('datafim', this.aux);


            let link = "https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentocadastro";
                  this.http.post(link, body).map(res => res.json())
                     .subscribe(data => {
                       console.log(data);
             alert("Sucesso");
                  },
                  error => {
                    console.log(error);
          alert("Erro: Você não possui uma vaga para liberar.");
                  });
            }
            else{
            alert('Este dia já foi liberado!');
            }
                  },
                  error => {
					  alert("Erro: Você não possui uma vaga para liberar.");
                  });



                  }
                  else{
                  alert("Você não possui vaga para realizar uma liberação!");
                  }

            }, error => {
				  alert("Erro: Você não possui uma vaga para liberar.");
             console.log("Error with Data");
            });



          })








      this.viewCtrl.dismiss(this.event);
  }

}
