import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompra } from '../compra.model';

@Component({
  selector: 'jhi-compra-detail',
  templateUrl: './compra-detail.component.html',
})
export class CompraDetailComponent implements OnInit {
  compra: ICompra | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compra }) => {
      this.compra = compra;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
