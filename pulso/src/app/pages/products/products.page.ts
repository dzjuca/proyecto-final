import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Product[] = [];
  isEnable = true;
  user: User;

  constructor( private loginService: LoginService,
               private modalController: ModalController,
               private productsService: ProductsService ) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.loadData();
  }

  doRefresh(event){
    this.loadData(event, true);
    this.isEnable = true;
    this.products = [];
  }

  loadData(event?, pull:boolean = false){

    this.productsService.getProducts( pull )
    .subscribe((data) => {
      console.log('[data:InicioPage]: ', data);
      this.products.push( ...data.body.products );

      if (event){
        event.target.complete();

        if(data.body.products.length === 0){
          this.isEnable = false;
        }
      }
    });

  }

}
