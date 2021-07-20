import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupermercado } from '../supermercado.model';

@Component({
  selector: 'jhi-supermercado-detail',
  templateUrl: './supermercado-detail.component.html',
})
export class SupermercadoDetailComponent implements OnInit {
  supermercado: ISupermercado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supermercado }) => {
      this.supermercado = supermercado;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
