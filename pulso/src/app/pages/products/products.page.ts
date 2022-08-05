import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ProductCreatePage } from '../product-create/product-create.page';

@Component({
  selector: 'app-productos',
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
    // solución temporal
    this.productsService.paginaProducts = 0;
    //
    this.user = this.loginService.getUser();
    this.loadData();
    this.productsService.newProduct
        .subscribe( (product) => {

          this.products.unshift( product );

        });
  }

  doRefresh(event){
    this.loadData(event, true);
    this.isEnable = true;
    this.products = [];
  }

  loadData(event?, pull:boolean = false){

    this.productsService.listProducts( pull )
        .subscribe((data) => {
        console.log("🚀 ~ file: products.page.ts ~ line 47 ~ ProductsPage ~ .subscribe ~ data", data);
          this.products.push( ...data.body.products );

          if (event){
            event.target.complete();

            if(data.body.products.length === 0){
              this.isEnable = false;
            }
          }
        });

  }

  productCreate() {
    this.modalController.create({ component: ProductCreatePage})
            .then((modal) => { modal.present() });
  }

  search(event){

  }

}
