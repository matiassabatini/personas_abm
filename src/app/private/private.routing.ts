import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrearEditarComponent } from './pages/crear-editar/crear-editar.component';

export const PrivateRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full',
  },
  {
    path: 'listado',
    component: ListadoComponent,
    pathMatch: 'full',
  },
  {
    path: 'nuevo-editar',
    component: CrearEditarComponent,
  },
  {
    path: 'nuevo-editar/:id',
    component: CrearEditarComponent,
  },
];
