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
        redirectTo: 'perfil',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../pages/perfil/perfil.module').then( m => m.PerfilPageModule)
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
