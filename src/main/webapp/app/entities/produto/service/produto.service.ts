import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProduto, getProdutoIdentifier } from '../produto.model';

export type EntityResponseType = HttpResponse<IProduto>;
export type EntityArrayResponseType = HttpResponse<IProduto[]>;

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/produtos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(produto: IProduto): Observable<EntityResponseType> {
    return this.http.post<IProduto>(this.resourceUrl, produto, { observe: 'response' });
  }

  update(produto: IProduto): Observable<EntityResponseType> {
    return this.http.put<IProduto>(`${this.resourceUrl}/${getProdutoIdentifier(produto) as number}`, produto, { observe: 'response' });
  }

  partialUpdate(produto: IProduto): Observable<EntityResponseType> {
    return this.http.patch<IProduto>(`${this.resourceUrl}/${getProdutoIdentifier(produto) as number}`, produto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProdutoToCollectionIfMissing(produtoCollection: IProduto[], ...produtosToCheck: (IProduto | null | undefined)[]): IProduto[] {
    const produtos: IProduto[] = produtosToCheck.filter(isPresent);
    if (produtos.length > 0) {
      const produtoCollectionIdentifiers = produtoCollection.map(produtoItem => getProdutoIdentifier(produtoItem)!);
      const produtosToAdd = produtos.filter(produtoItem => {
        const produtoIdentifier = getProdutoIdentifier(produtoItem);
        if (produtoIdentifier == null || produtoCollectionIdentifiers.includes(produtoIdentifier)) {
          return false;
        }
        produtoCollectionIdentifiers.push(produtoIdentifier);
        return true;
      });
      return [...produtosToAdd, ...produtoCollection];
    }
    return produtoCollection;
  }
}
