import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICompra, Compra } from '../compra.model';
import { CompraService } from '../service/compra.service';

@Injectable({ providedIn: 'root' })
export class CompraRoutingResolveService implements Resolve<ICompra> {
  constructor(protected service: CompraService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((compra: HttpResponse<Compra>) => {
          if (compra.body) {
            return of(compra.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Compra());
  }
}
