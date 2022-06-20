import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pulso',
  templateUrl: './pulso.page.html',
  styleUrls: ['./pulso.page.scss'],
})
export class PulsoPage implements OnInit {

  menuOptions:Observable<Menu[]>;

  constructor(private dataService: DataService,
              private router:Router) { }

  ngOnInit() {
    this.menuOptions = this.dataService.getMenuOpts();
  }
  doExit() {
    this.router.navigateByUrl('/login');
  }
}
