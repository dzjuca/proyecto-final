import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-pulso',
  templateUrl: './pulso.page.html',
  styleUrls: ['./pulso.page.scss'],
})
export class PulsoPage implements OnInit {

  public user: User = {
    name:'',
    username:'',
    email:''
  };
  menuOptions:Observable<Menu[]>;

  constructor(private dataService: DataService,
              private router:Router,
              private loginService: LoginService
              ) { }

  ngOnInit() {
    this.menuOptions = this.dataService.getMenuOpts();
    this.user = this.loginService.getUser();
  }
  logout() {
    //this.router.navigateByUrl('/login');
    this.loginService.logout()
                     .then(() => {
                      this.router.navigateByUrl('/login');
                     })

  }
}
