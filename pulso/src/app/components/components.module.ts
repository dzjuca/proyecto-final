import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input/input.component';



@NgModule({
  declarations: [HeaderComponent, InputComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, InputComponent]
})
export class ComponentsModule { }
