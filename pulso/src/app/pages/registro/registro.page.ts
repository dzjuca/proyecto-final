import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from '../../services/login.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyValidators } from '../../../utils/validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage implements OnInit {

  registerForm:FormGroup;

  constructor(
    private loginService:LoginService,
    private formBuilder:FormBuilder) {
      this.buildRegisterForm();
    }

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

  private buildRegisterForm(){
    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(25), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['', [Validators.required]],
    },{
      validators:MyValidators.matchPasswords
    })
  }

  doRegister(event){
    if (this.registerForm.valid){
      console.log(this.registerForm.value);
    }else{
      this.registerForm.markAllAsTouched();
    }
    //console.log(this.user)
    //this.loginService.addUser(this.user)
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Ingrese un usuario' },
    ],
    'email': [
      { type: 'required', message: 'Ingrese un correo' }
    ],
    'password': [
      { type: 'required', message: 'Ingrese una contraseña' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Ingrese la confimación de contraseña'},
    ],

  }

  get usernameField(){
    return this.registerForm.get('username');
  }
  get isUsernameFieldValid(){
    return this.usernameField.touched && this.usernameField.valid;
  }
  get isUsernameFieldInvalid(){
    return this.usernameField.touched && this.usernameField.invalid;
  }

  get emailField(){
    return this.registerForm.get('email');
  }
  get isEmailFieldValid(){
    return this.emailField.touched && this.emailField.valid;
  }
  get isEmailFieldInvalid(){
    return this.emailField.touched && this.emailField.invalid;
  }

  get passwordField(){
    return this.registerForm.get('password');
  }
  get isPasswordFieldValid(){
    return this.passwordField.touched && this.passwordField.valid;
  }
  get isPasswordFieldInvalid(){
    return this.passwordField.touched && this.passwordField.invalid;
  }
  get confirmPasswordField(){
    return this.registerForm.get('confirmPassword');
  }
  get isConfirmPasswordFieldValid(){
    return this.confirmPasswordField.touched && this.confirmPasswordField.valid;
  }
  get isConfirmPasswordFieldInvalid(){
    return this.confirmPasswordField.touched && this.confirmPasswordField.invalid || this.registerForm.hasError('match_password');
  }


}
