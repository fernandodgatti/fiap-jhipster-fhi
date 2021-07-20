import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompra } from '../compra.model';
import { CompraService } from '../service/compra.service';

@Component({
  templateUrl: './compra-delete-dialog.component.html',
})
export class CompraDeleteDialogComponent {
  compra?: ICompra;

  constructor(protected compraService: CompraService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.compraService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
