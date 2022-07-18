import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() value:string;

  username: string;
  password: string;

  constructor(private loginService: LoginService,
              private router:Router,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private navController:NavController,
              private uiService:UiService) { }

  ngOnInit() {
  }

  doLogin(){
    console.log('[LoginPage]: doLogin()');
    console.log('Email: '+this.username + ", Password: "+ this.password);
    this.loginService.login(this.username, this.password)
                     .then(() => {
                      this.router.navigateByUrl('/pulso');
                      //this.navController.navigateRoot('/pulso', { animated: true});
                     })
                     .catch((e) => {
                     this.uiService.presentAlert('Error de autenticación','Usuario o  contraseña incorrectos');
                     });
  }


}
