import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SupermercadoComponent } from './list/supermercado.component';
import { SupermercadoDetailComponent } from './detail/supermercado-detail.component';
import { SupermercadoUpdateComponent } from './update/supermercado-update.component';
import { SupermercadoDeleteDialogComponent } from './delete/supermercado-delete-dialog.component';
import { SupermercadoRoutingModule } from './route/supermercado-routing.module';

@NgModule({
  imports: [SharedModule, SupermercadoRoutingModule],
  declarations: [SupermercadoComponent, SupermercadoDetailComponent, SupermercadoUpdateComponent, SupermercadoDeleteDialogComponent],
  entryComponents: [SupermercadoDeleteDialogComponent],
})
export class SupermercadoModule {}
