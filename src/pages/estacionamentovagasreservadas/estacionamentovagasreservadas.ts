import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {AlertController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-estacionamentomain',
  templateUrl: 'estacionamentovagasreservadas.html'
})
export class Estacionamentovagasreservadas {
items: any;
items2: any;
dataini:any;
datafim:any;
dados:any;
resposta:any;
teste:any;
today:any;
dd:any;
mm:any;
yyyy:any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {
  this.listar();
  }


  listar(){
  this.storage.get('ldap').then((val) => {
  this.today = new Date();
  this.dd = this.today.getDate();
  this.mm = this.today.getMonth()+1; //January is 0!
  this.yyyy = this.today.getFullYear();
  this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentocadastro1/"+this.yyyy+"-"+this.mm+"-"+this.dd+","+val).map(res => res.json()).subscribe (data => {
  console.log("Got Data"+data);
  this.items = data;

  }, error => {
   console.log("Error with Data");
  });
        })
  }
  deletar(id){

  let link = "https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentocadastro1/"+id;
        this.http.put(link, {"usuario":""}).map(res => res.json())
           .subscribe(data => {
             alert("Vaga liberada com sucesso!");
             this.listar();
        },
        error => {
          console.log(error);
        });
        }


}
