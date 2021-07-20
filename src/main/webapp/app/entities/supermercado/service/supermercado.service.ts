import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISupermercado, getSupermercadoIdentifier } from '../supermercado.model';

export type EntityResponseType = HttpResponse<ISupermercado>;
export type EntityArrayResponseType = HttpResponse<ISupermercado[]>;

@Injectable({ providedIn: 'root' })
export class SupermercadoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/supermercados');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(supermercado: ISupermercado): Observable<EntityResponseType> {
    return this.http.post<ISupermercado>(this.resourceUrl, supermercado, { observe: 'response' });
  }

  update(supermercado: ISupermercado): Observable<EntityResponseType> {
    return this.http.put<ISupermercado>(`${this.resourceUrl}/${getSupermercadoIdentifier(supermercado) as number}`, supermercado, {
      observe: 'response',
    });
  }

  partialUpdate(supermercado: ISupermercado): Observable<EntityResponseType> {
    return this.http.patch<ISupermercado>(`${this.resourceUrl}/${getSupermercadoIdentifier(supermercado) as number}`, supermercado, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISupermercado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupermercado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSupermercadoToCollectionIfMissing(
    supermercadoCollection: ISupermercado[],
    ...supermercadosToCheck: (ISupermercado | null | undefined)[]
  ): ISupermercado[] {
    const supermercados: ISupermercado[] = supermercadosToCheck.filter(isPresent);
    if (supermercados.length > 0) {
      const supermercadoCollectionIdentifiers = supermercadoCollection.map(
        supermercadoItem => getSupermercadoIdentifier(supermercadoItem)!
      );
      const supermercadosToAdd = supermercados.filter(supermercadoItem => {
        const supermercadoIdentifier = getSupermercadoIdentifier(supermercadoItem);
        if (supermercadoIdentifier == null || supermercadoCollectionIdentifiers.includes(supermercadoIdentifier)) {
          return false;
        }
        supermercadoCollectionIdentifiers.push(supermercadoIdentifier);
        return true;
      });
      return [...supermercadosToAdd, ...supermercadoCollection];
    }
    return supermercadoCollection;
  }
}
