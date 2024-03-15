import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './private/layout/layout.component';
import { PrivateRoutes } from './private/private.routing';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: PrivateRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
