import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input/input.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PipesModule } from '../pipes/pipes.module';
import { MapComponent } from './map/map.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HeaderComponent,
    InputComponent,
    MenuComponent,
    PostComponent,
    PostsComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    HeaderComponent,
    InputComponent,
    MenuComponent,
    PostsComponent,
    MapComponent
  ]
})
export class ComponentsModule { }
