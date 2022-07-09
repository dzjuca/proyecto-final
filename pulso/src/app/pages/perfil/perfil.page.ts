import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  mode:string;
  disabled:boolean;
  user:any ={
    name:"Daniel Z. Juca",
    password:"1234",
    email:"dzjuca@gmail.com",
    username:"__daniel82__",
    birthday:"05-06-1982",
    phone:"0984746267",
    suscription: "Mensual",
    avatar:"/assets/img/avatar/ian-avatar.png"
  }

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    ) {
    this.mode = 'view';
    this.disabled = true;
  }

  ngOnInit() {
  }

  editPerfil(){
    this.mode = 'edit';
    this.disabled = false;
    this.menu.enable(false, 'pulsoMenu');
  }

  save(){
    this.mode = 'view';
    this.disabled = true;
    this.menu.enable(true, 'pulsoMenu');
  }

  cancel(){
    this.mode = 'view';
    this.disabled = true;
    this.menu.enable(true, 'pulsoMenu');
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
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.user.avatar = '';
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
      resultType:CameraResultType.Base64,
      source:CameraSource.Camera
    });
    this.user.avatar = 'data:image/jpeg;base64,' + imageData.base64String;
   }

 async selectImages(){
  const imageData = await Camera.getPhoto({
    quality:100,
    allowEditing:false,
    resultType:CameraResultType.Base64,
    source:CameraSource.Photos
  });
  this.user.avatar = 'data:image/jpeg;base64,' + imageData.base64String;
 }
}
