import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  user: User;
  pulsoUsers: User [];

  constructor( private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.listPulsoUsers();
  }

  listPulsoUsers(query?:string){

    this.loginService.getUsers(query)
                     .then((pulsoUsers:User[]) => {
                      this.pulsoUsers = pulsoUsers.sort();
                     })

  }

  search(ev) {
    let query = ev.target.value.trim();
    this.listPulsoUsers(query);
  }

}
