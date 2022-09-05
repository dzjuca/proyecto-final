import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulsoPageRoutingModule } from './pulso-routing.module';

import { PulsoPage } from './pulso.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PulsoPageRoutingModule,
    PipesModule
  ],
  declarations: [PulsoPage]
})
export class PulsoPageModule {}
