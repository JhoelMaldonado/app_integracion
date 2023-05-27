import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Ruta de ejemplo para la re direccion de algunas 
  //{
  //  path: 'home',
  //  loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  //},
  //{
  //  path: '',
  //  redirectTo: 'home',
  //  pathMatch: 'full'
  //},
  {
    path: '',
    loadChildren: () => import('./Paginas/inicio-sesion/inicio-sesion.module').then(m => m.InicioSesionPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./Paginas/principal/principal.module').then(m => m.PrincipalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
