import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulsoPageRoutingModule } from './pulso-routing.module';

import { PulsoPage } from './pulso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PulsoPageRoutingModule
  ],
  declarations: [PulsoPage]
})
export class PulsoPageModule {}
