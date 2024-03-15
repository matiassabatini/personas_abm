import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialPrivateModule } from './material-private.module';
import { PrivateRoutes } from './private.routing';
import { RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';

@NgModule({
  declarations: [LayoutComponent, ListadoComponent, CrearEditarComponent],
  imports: [
    CommonModule,
    MaterialPrivateModule,
    RouterModule.forChild(PrivateRoutes),
    RouterModule,
  ],
})
export class PrivateModule {}
