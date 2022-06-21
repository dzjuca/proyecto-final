import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formattedDate?: string;
  public dateValue?: string;

  constructor() { }

  ngOnInit() {
  }

  formatDate() {
    this.formattedDate = format(parseISO(this.dateValue), 'MMM d, yyyy');
  }

}
