import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProduto, Produto } from '../produto.model';
import { ProdutoService } from '../service/produto.service';
import { ICompra } from 'app/entities/compra/compra.model';
import { CompraService } from 'app/entities/compra/service/compra.service';
import { ISupermercado } from 'app/entities/supermercado/supermercado.model';
import { SupermercadoService } from 'app/entities/supermercado/service/supermercado.service';

@Component({
  selector: 'jhi-produto-update',
  templateUrl: './produto-update.component.html',
})
export class ProdutoUpdateComponent implements OnInit {
  isSaving = false;

  comprasSharedCollection: ICompra[] = [];
  supermercadosSharedCollection: ISupermercado[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    descricao: [],
    quantidade: [],
    preco: [],
    compras: [],
    supermercados: [],
  });

  constructor(
    protected produtoService: ProdutoService,
    protected compraService: CompraService,
    protected supermercadoService: SupermercadoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produto }) => {
      this.updateForm(produto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produto = this.createFromForm();
    if (produto.id !== undefined) {
      this.subscribeToSaveResponse(this.produtoService.update(produto));
    } else {
      this.subscribeToSaveResponse(this.produtoService.create(produto));
    }
  }

  trackCompraById(index: number, item: ICompra): number {
    return item.id!;
  }

  trackSupermercadoById(index: number, item: ISupermercado): number {
    return item.id!;
  }

  getSelectedCompra(option: ICompra, selectedVals?: ICompra[]): ICompra {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedSupermercado(option: ISupermercado, selectedVals?: ISupermercado[]): ISupermercado {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(produto: IProduto): void {
    this.editForm.patchValue({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
      preco: produto.preco,
      compras: produto.compras,
      supermercados: produto.supermercados,
    });

    this.comprasSharedCollection = this.compraService.addCompraToCollectionIfMissing(
      this.comprasSharedCollection,
      ...(produto.compras ?? [])
    );
    this.supermercadosSharedCollection = this.supermercadoService.addSupermercadoToCollectionIfMissing(
      this.supermercadosSharedCollection,
      ...(produto.supermercados ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.compraService
      .query()
      .pipe(map((res: HttpResponse<ICompra[]>) => res.body ?? []))
      .pipe(
        map((compras: ICompra[]) =>
          this.compraService.addCompraToCollectionIfMissing(compras, ...(this.editForm.get('compras')!.value ?? []))
        )
      )
      .subscribe((compras: ICompra[]) => (this.comprasSharedCollection = compras));

    this.supermercadoService
      .query()
      .pipe(map((res: HttpResponse<ISupermercado[]>) => res.body ?? []))
      .pipe(
        map((supermercados: ISupermercado[]) =>
          this.supermercadoService.addSupermercadoToCollectionIfMissing(supermercados, ...(this.editForm.get('supermercados')!.value ?? []))
        )
      )
      .subscribe((supermercados: ISupermercado[]) => (this.supermercadosSharedCollection = supermercados));
  }

  protected createFromForm(): IProduto {
    return {
      ...new Produto(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      quantidade: this.editForm.get(['quantidade'])!.value,
      preco: this.editForm.get(['preco'])!.value,
      compras: this.editForm.get(['compras'])!.value,
      supermercados: this.editForm.get(['supermercados'])!.value,
    };
  }
}
