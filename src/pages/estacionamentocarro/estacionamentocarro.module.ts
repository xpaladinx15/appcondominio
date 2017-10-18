import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstacionamentocarroPage } from './estacionamentocarro';

@NgModule({
  declarations: [
    EstacionamentocarroPage,
  ],
  imports: [
    IonicPageModule.forChild(EstacionamentocarroPage),
  ],
  exports: [
    EstacionamentocarroPage
  ]
})
export class EstacionamentocarroPageModule {}
