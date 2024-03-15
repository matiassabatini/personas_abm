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
    path: 'nuevo',
    component: CrearEditarComponent,
  },
  {
    path: 'editar/:id',
    component: CrearEditarComponent,
  },
];
