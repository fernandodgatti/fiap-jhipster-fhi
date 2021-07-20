import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'compra',
        data: { pageTitle: 'comparsApp.compra.home.title' },
        loadChildren: () => import('./compra/compra.module').then(m => m.CompraModule),
      },
      {
        path: 'usuario',
        data: { pageTitle: 'comparsApp.usuario.home.title' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'produto',
        data: { pageTitle: 'comparsApp.produto.home.title' },
        loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule),
      },
      {
        path: 'supermercado',
        data: { pageTitle: 'comparsApp.supermercado.home.title' },
        loadChildren: () => import('./supermercado/supermercado.module').then(m => m.SupermercadoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
