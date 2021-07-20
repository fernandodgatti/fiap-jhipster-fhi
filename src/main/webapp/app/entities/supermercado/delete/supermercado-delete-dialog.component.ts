import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupermercado } from '../supermercado.model';
import { SupermercadoService } from '../service/supermercado.service';

@Component({
  templateUrl: './supermercado-delete-dialog.component.html',
})
export class SupermercadoDeleteDialogComponent {
  supermercado?: ISupermercado;

  constructor(protected supermercadoService: SupermercadoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supermercadoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
