import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {ModalController, AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-estacionamentomain',
  templateUrl: 'estacionamentocadastro.html'
})
export class Estacionamentocadastro {
items: any;
dataini:any;
datafim:any;
dados:any;


eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };


  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private modalCtrl: ModalController, private camera: Camera, public loadingController: LoadingController) {
    //let link = "http://mti-portal.sicredi.net/noc-dev/app/dias.php";
    //    this.http.post(link, "teste")
    //       .map(res => res.json()).subscribe(data => {
    //        this.items = data;
    //       },error => {
    //        console.log("Error");
    //      });
  }

salvar(dataini, datafim){
//alert(this.dataini+" "+this.datafim);
this.storage.get('ldap').then((val) => {
this.dados= this.dataini+"/"+this.datafim+"/"+val;
let link = "http://mti-portal.sicredi.net/noc-dev/app/estacionamentocadastro.php";
      this.http.post(link, this.dados)
         .subscribe(data => {
          alert("Vaga liberada com sucesso!");
         },error => {
          console.log("Error");
        });

      })
}


data(mes) {
    //alert("funciona"+mes);
    this.storage.get('ldap').then((val) => {
    this.dados= mes+"/"+mes+"/"+val;
    let link = "http://mti-portal.sicredi.net/noc-dev/app/estacionamentocadastro.php";
          this.http.post(link, this.dados)
             .subscribe(data => {
              alert("Vaga liberada com sucesso!");
             },error => {
              console.log("Error");
            });

          })
  }

  datarange(mes1, mes2) {
      //alert("funciona"+mes1+mes2);
      this.storage.get('ldap').then((val) => {
      this.dados= mes1+"/"+mes2+"/"+val;
      let link = "http://mti-portal.sicredi.net/noc-dev/app/estacionamentocadastro.php";
            this.http.post(link, this.dados)
               .subscribe(data => {
                alert("Vaga liberada com sucesso!");
               },error => {
                console.log("Error");
              });

            })
    }










    addEvent() {
        let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
        modal.present();
        modal.onDidDismiss(data => {
          if (data) {
            let eventData = data;

            eventData.startTime = new Date(data.startTime);
            eventData.endTime = new Date(data.endTime);

            let events = this.eventSource;
            events.push(eventData);
            this.eventSource = [];
            setTimeout(() => {
              this.eventSource = events;
            });
          }
        });
      }

      onViewTitleChanged(title) {
        this.viewTitle = title;
        if(title == "outubro 2017") {
        this.viewTitle = "Outubro";
        }
        if(title == "novembro 2017") {
        this.viewTitle = "Novembro";
        }
        if(title == "dezembro 2017") {
        this.viewTitle = "Dezembro";
        }
        if(title == "janeiro 2018") {
        this.viewTitle = "Janeiro";
        }
        if(title == "fevereiro 2018") {
        this.viewTitle = "Fevereiro";
        }
        if(title == "março 2018") {
        this.viewTitle = "Março";
        }
        if(title == "abril 2018") {
        this.viewTitle = "Abril";
        }

      }

      onEventSelected(event) {
        let start = moment(event.startTime).format('LLLL');
        let end = moment(event.endTime).format('LLLL');

        let alert = this.alertCtrl.create({
          title: 'ddddddd' + event.title,
          subTitle: 'From: ' + start + '<br>To: ' + end,
          buttons: ['OK']
        })
        alert.present();
      }

      onTimeSelected(ev) {
        this.selectedDay = ev.selectedTime;
        //alert(this.selectedDay);
        this.addEvent();
      }







}
