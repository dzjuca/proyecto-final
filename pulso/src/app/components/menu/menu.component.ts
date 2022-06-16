import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuOptions:Observable<Menu[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.menuOptions = this.dataService.getMenuOpts();
  }

}
