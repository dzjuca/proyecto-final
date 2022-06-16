import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


  getMenuOpts(){
    return this.http.get<Menu[]>('/assets/data/menu.json')
  }


}
