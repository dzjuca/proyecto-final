import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss']
})
export class PerfilPage implements OnInit {

  mode:string;
  disabled:boolean;
  user:User;
  usuario:User;

  constructor(
    private loginService:LoginService,
    private menu: MenuController,
    private actionSheetController: ActionSheetController,
    private uiService:UiService
    ) {
    this.mode = 'view';
    this.disabled = true;
  }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.usuario = this.loginService.getUsuario();

  }

  editPerfil(){
    this.mode = 'edit';
    this.disabled = false;
    this.menu.enable(false, 'pulsoMenu');
  }

  async save(){
    this.mode = 'view';
    this.disabled = true;
    this.menu.enable(true, 'pulsoMenu');
    const response = await this.loginService.updateUser(this.user);
    if(response){
      this.uiService.presentToast('Usuario Actualizado Correctamente');
    }else{
      this.uiService.presentToast('no fue posible la actualización');
    }

  }

  async cancel(){
    this.mode = 'view';
    this.disabled = true;
    this.menu.enable(true, 'pulsoMenu');
    this.user = await this.loginService.getUser();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Modificar foto de perfil',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Cámara',
        icon: 'camera',
        handler: () => {
          this.takeImage();
        }
      },
      {
        text: 'Galería',
        icon: 'images',
        handler: () => {
          this.selectImages();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async takeImage(){
    const imageData = await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.Uri,
      source:CameraSource.Camera
    });
    //this.user.avatar = 'data:image/jpeg;base64,' + imageData.base64String;
    //await this.loginService.updateUser(this.user);
    await this.loginService.updateAvatar(imageData);
   }

 async selectImages(){
  const imageData = await Camera.getPhoto({
    quality:100,
    allowEditing:false,
    resultType:CameraResultType.Uri,
    source:CameraSource.Photos,
  });
  //this.user.avatar = 'data:image/jpeg;base64,' + imageData.base64String;
  //await this.loginService.updateUser(this.user);
  const response = await this.loginService.updateAvatar(imageData);
  console.log("🚀 ~ file: perfil.page.ts ~ line 120 ~ PerfilPage ~ selectImages ~ response", response);
 }
}
