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
  selector: 'page-estacionamentomapa',
  templateUrl: 'estacionamentomapa.html'
})
export class Estacionamentomapa {
items: any;
items2: any;
posts: any;
dataini:any;
datafim:any;
dados:any;
resposta:any;
teste:any;
today:any;
dd:any;
mm:any;
yyyy:any;
j:any;
  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, private alertCtrl: AlertController, private camera: Camera, public loadingController: LoadingController) {
  this.listar();
  }


  listar(){

  this.today = new Date();
  this.dd = this.today.getDate()+1;
  this.mm = this.today.getMonth()+1; //January is 0!
  this.yyyy = this.today.getFullYear();
        this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentocadastro/"+this.yyyy+"-"+this.mm+"-"+this.dd).map(res => res.json()).subscribe (data => {
        console.log("Got Data"+data);
        this.items = data;

        }, error => {
         console.log("Error with Data");
        });
  }

  gravar(id){
  this.storage.get('ldap').then((val) => {




  this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamento/"+val).map(res => res.json()).subscribe(data => {


                  if(data !=""){

                  this.posts = null;

                this.http.get('https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentoreservadoid/'+id).map(res => res.json()).subscribe(data => {
                    this.posts = data;
                    console.log(this.posts[0].usuario);

                    if(this.posts[0].usuario==""){

                    let body = new FormData();
                        body.append('usuario', 'bruno_fasolin');
                        this.j = '{"usuario": "'+val+'"}';
                        var myObj = JSON.parse(this.j);
                    let link = "https://apps.sicredi.com.br/systemstatus/services/public/v1/estacionamentocadastro/"+id;
                          this.http.put(link, myObj).map(res => res.json())
                             .subscribe(data => {
                               alert("Vaga reservada com sucesso");


                               this.listar();
                          },
                          error => {
                            console.log(error);
                          });

                    }else{
                    alert("Você quase conseguiu mas está vaga foi reservada por outra pessoa!");
                    this.listar();
                    }



                });




                  }else{
                  alert("Você não pode reservar uma vaga pois não tem nenhum carro cadastrado no sistema!");
                  }

                  },
                  error => {
                    console.log(error);
                  });







        })
  }

}
