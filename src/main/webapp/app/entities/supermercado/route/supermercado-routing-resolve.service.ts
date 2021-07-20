import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISupermercado, Supermercado } from '../supermercado.model';
import { SupermercadoService } from '../service/supermercado.service';

@Injectable({ providedIn: 'root' })
export class SupermercadoRoutingResolveService implements Resolve<ISupermercado> {
  constructor(protected service: SupermercadoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupermercado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((supermercado: HttpResponse<Supermercado>) => {
          if (supermercado.body) {
            return of(supermercado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Supermercado());
  }
}
