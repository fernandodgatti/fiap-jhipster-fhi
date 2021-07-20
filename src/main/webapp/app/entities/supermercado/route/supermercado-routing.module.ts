import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SupermercadoComponent } from '../list/supermercado.component';
import { SupermercadoDetailComponent } from '../detail/supermercado-detail.component';
import { SupermercadoUpdateComponent } from '../update/supermercado-update.component';
import { SupermercadoRoutingResolveService } from './supermercado-routing-resolve.service';

const supermercadoRoute: Routes = [
  {
    path: '',
    component: SupermercadoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupermercadoDetailComponent,
    resolve: {
      supermercado: SupermercadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupermercadoUpdateComponent,
    resolve: {
      supermercado: SupermercadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupermercadoUpdateComponent,
    resolve: {
      supermercado: SupermercadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(supermercadoRoute)],
  exports: [RouterModule],
})
export class SupermercadoRoutingModule {}
