import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PulsoPage } from './pulso.page';

const routes: Routes = [
  {
    path: '',
    component: PulsoPage,
    children:[
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('../../pages/inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../pages/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../../pages/products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../pages/settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PulsoPageRoutingModule {}
