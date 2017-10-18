import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoscopaPage } from './pedidoscopa';

@NgModule({
  declarations: [
    PedidoscopaPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoscopaPage),
  ],
  exports: [
    PedidoscopaPage
  ]
})
export class PedidoscopaPageModule {}
