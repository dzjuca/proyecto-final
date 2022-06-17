import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pulso',
  templateUrl: './pulso.page.html',
  styleUrls: ['./pulso.page.scss'],
})
export class PulsoPage implements OnInit {

  menuOptions:Observable<Menu[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.menuOptions = this.dataService.getMenuOpts();
  }
}
