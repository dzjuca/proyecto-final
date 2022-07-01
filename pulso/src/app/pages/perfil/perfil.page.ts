import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

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

  constructor() {
    this.mode = 'view';
    this.disabled = true;
  }

  ngOnInit() {
  }

  editPerfil(){
    this.mode = 'edit';
    this.disabled = false;
  }

  save(){
    this.mode = 'view';
    this.disabled = true;
  }

  cancel(){
    this.mode = 'view';
    this.disabled = true;
  }



}
