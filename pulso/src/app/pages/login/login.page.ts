import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string
  password: string

  constructor(private loginService: LoginService,
              private router:Router,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  doLogin(){
    console.log('[LoginPage]: doLogin()');
    this.loginService.login(this.email, this.password)
                     .then(() => {
                      this.router.navigateByUrl('/pulso')
                     })
                     .catch((e) => {
                        this.alertCtrl.create({
                          header:'Error De Autenticación',
                          message:e.message,
                          buttons:[{text:'OK', role:'cancelar'}]
                        })
                        .then((alert) => alert.present());
                     });
  }


}
