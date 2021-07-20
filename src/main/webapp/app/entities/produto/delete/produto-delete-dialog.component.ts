import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduto } from '../produto.model';
import { ProdutoService } from '../service/produto.service';

@Component({
  templateUrl: './produto-delete-dialog.component.html',
})
export class ProdutoDeleteDialogComponent {
  produto?: IProduto;

  constructor(protected produtoService: ProdutoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produtoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
