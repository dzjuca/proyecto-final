import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor( private alertController:AlertController,
               private toastController:ToastController) { }

  async presentAlert(header: string, message:string) {
    let alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      position: 'middle',
      duration: 1500
    });
    toast.present();
  }








}
