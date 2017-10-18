import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { Inicial } from '../inicial/inicial';
import CryptoJS from 'crypto-js';
@Component({
  selector: 'page-page',
  templateUrl: 'login.html'
})
export class Login {
  ldap:any;
  senha:any;
  items:any;
  items2:any;
  min:any;
  dados: any;
  ldapminus: any;
  ciphertext: any;
  constructor(public navCtrl: NavController , public storage: Storage, public http: Http ) {

    //this.storage.get('name').then((data) =>{
  //    this.min = data;
  //  });

  }

setData(ldap, senha){
this.ldapminus = this.ldap.toLowerCase( );
this.dados= this.ldapminus+"/"+this.senha;
let link = "https://mti-exec.sicredi.com.br/diariofechamento/ldap.php";
      this.http.post(link, this.dados).map(res => res.json())
         .subscribe(data => {
        this.items = data;

        //alert(this.items.nome);
        if(this.items.id == 1){
        //alert(this.items.foto);
        this.storage.set('foto', this.items.foto);
        this.storage.set('nome', this.items.nome);
        this.storage.set('matricula', this.items.matricula);
        this.storage.set('token', this.items.token);
        this.storage.set('name', '1');
        this.storage.set('ldap', this.ldapminus);

        this.ciphertext = CryptoJS.AES.encrypt(this.senha, 'condominio');
        this.storage.set('senha', this.ciphertext.toString());
        
        this.storage.get('name').then((val) => {
     console.log(val);
   })
        this.navCtrl.push(Inicial);
        }else{
        this.storage.set('name', '0');
        alert("Ldap ou senha inválidos!");
        }

      },
      error => {
        console.log(error);
      });


//this.navCtrl.push(HomePage);

//this.navCtrl.push(HomePage);
}



setData1(ldap, senha){


let body = new FormData();
    body.append('username', this.ldap);
    body.append('password', this.senha);
    body.append('version', '0.0.0.0');

let link = "https://apps.sicredi.com.br/systemstatus/services/public/v1/login";
      this.http.post(link, body).map(res => res.json())
         .subscribe(data => {
        this.items = data;

        //alert(this.items.result);
        if(this.items.result == "success"){
        //this.storage.set('foto', this.items.foto);
        this.storage.set('nome', this.ldap);
        this.storage.set('name', '1');
        this.storage.set('ldap', this.ldap);
        this.storage.set('senha', this.senha);
        this.navCtrl.push(Inicial);
        }else{
        this.storage.set('name', '0');
        alert(this.items.result);
        }

      },
      error => {
        console.log(error);
      });

      let headers = new Headers();
      headers.append('Auth-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwcy5zaWNyZWRpLmNvbS5iciIsImF1ZCI6Imh0dHA6XC9cL3N5c3RlbXN0YXR1cy5zaWNyZWRpLm5ldCIsImlhdCI6MTUwNDE4MzY0NSwiZXhwIjoxNTA2Nzc1NjQ1LCJ1c2VybmFtZSI6ImJydW5vX2Zhc29saW4iLCJsZGFwX2RhdGEiOnsibm9tZSI6IkJydW5vIEZhc29saW4gT2xpdmVpcmEiLCJncnVwb3MiOnsiY291bnQiOjE2LCIwIjoib3BlcmFjb2VzX3RpIiwiMSI6ImFuYWxpc3RhIiwiMiI6ImNhc2hfY29udHJvbGxlciIsIjMiOiJjYXNoX2NvbnRyb2xsZXJfYWRtaW4iLCI0IjoiY2FzaF9zZXJ2ZXJfY29uc3VsdGEiLCI1IjoibW9uaXRvcmFtZW50b190aSIsIjYiOiJvcGVyYWNhb19tb25pdG9yYW1lbnRvIiwiNyI6InBvcnZvY2VfY29sYWJvcmFkb3Jlc19waWxvdG8iLCI4IjoibW9uaXRvcmFtZW50b19jZSIsIjkiOiJuYXNfZmlsZWNhczAxX21vbml0b3JhbWVudG9fYmFja3VwX3ciLCIxMCI6Im5hc19maWxlY2FzMDFfb3BfdGlfbW9uaXRvcmFtZW50b193IiwiMTEiOiJtb25pdG9yYW1lbnRvX3NlcnZpY2VkZXNrIiwiMTIiOiJmbmNfYW5hbGlzdGFfcHJvZHVjYW9fdGkiLCIxMyI6ImNvbnRyb2xtX2NvbnN1bHRhIiwiMTQiOiJpbmZyYWVzdHJ1dHVyYV9vcGVyYWNvZXNfdGkiLCIxNSI6ImFjZXNzb3JlbW90b19jb2xhYm9yYWRvcmVzIn19LCJjdXJyZW50VmVyc2lvbiI6IjAuMC4wLjAifQ.8MCBpNcEamS2Q-MgXo8c1JED-orxQg8nepqJQ7M6ZzQ');
      this.http.get("https://apps.sicredi.com.br/systemstatus/services/public/v1/ldapphoto", {headers: headers}).map(res => res.json()).subscribe (data => {
      console.log("Got Data"+data);
      this.items2 = data;
      this.storage.set('foto', this.items2.photo);
      }, error => {
       console.log("Error with Data");
      });

}


















}
