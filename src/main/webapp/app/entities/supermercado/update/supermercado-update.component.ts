import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISupermercado, Supermercado } from '../supermercado.model';
import { SupermercadoService } from '../service/supermercado.service';

@Component({
  selector: 'jhi-supermercado-update',
  templateUrl: './supermercado-update.component.html',
})
export class SupermercadoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    cnpj: [],
  });

  constructor(protected supermercadoService: SupermercadoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supermercado }) => {
      this.updateForm(supermercado);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supermercado = this.createFromForm();
    if (supermercado.id !== undefined) {
      this.subscribeToSaveResponse(this.supermercadoService.update(supermercado));
    } else {
      this.subscribeToSaveResponse(this.supermercadoService.create(supermercado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupermercado>>): void {
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

  protected updateForm(supermercado: ISupermercado): void {
    this.editForm.patchValue({
      id: supermercado.id,
      nome: supermercado.nome,
      cnpj: supermercado.cnpj,
    });
  }

  protected createFromForm(): ISupermercado {
    return {
      ...new Supermercado(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      cnpj: this.editForm.get(['cnpj'])!.value,
    };
  }
}
