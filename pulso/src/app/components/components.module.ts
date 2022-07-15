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



@NgModule({
  declarations: [
    HeaderComponent,
    InputComponent,
    MenuComponent,
    PostComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    InputComponent,
    MenuComponent,
    PostsComponent
  ]
})
export class ComponentsModule { }
