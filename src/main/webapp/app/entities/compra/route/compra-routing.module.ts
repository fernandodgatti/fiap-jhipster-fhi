import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CompraComponent } from '../list/compra.component';
import { CompraDetailComponent } from '../detail/compra-detail.component';
import { CompraUpdateComponent } from '../update/compra-update.component';
import { CompraRoutingResolveService } from './compra-routing-resolve.service';

const compraRoute: Routes = [
  {
    path: '',
    component: CompraComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompraDetailComponent,
    resolve: {
      compra: CompraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompraUpdateComponent,
    resolve: {
      compra: CompraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompraUpdateComponent,
    resolve: {
      compra: CompraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(compraRoute)],
  exports: [RouterModule],
})
export class CompraRoutingModule {}
