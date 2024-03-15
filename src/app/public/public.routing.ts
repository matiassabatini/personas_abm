import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
];

export const PublicRoutes = RouterModule.forChild(routes);
