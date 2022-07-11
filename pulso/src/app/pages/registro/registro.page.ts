import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { User } from 'src/app/models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor( private loginService:LoginService) { }

  user:User = {
    name:'',
    username:'',
    email:'',
    password:'',
    birthday: new Date(),
    phone:''
  }

  ngOnInit() {
  }

  doRegister(){
    console.log(this.user)
    this.loginService.addUser(this.user)
  }

}
