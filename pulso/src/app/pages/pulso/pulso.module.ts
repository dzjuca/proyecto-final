import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulsoPageRoutingModule } from './pulso-routing.module';

import { PulsoPage } from './pulso.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PulsoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PulsoPage]
})
export class PulsoPageModule {}
