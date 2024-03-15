import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PublicRoutes } from './public.routing';
import { MaterialPublicModule } from './material-public.module';

@NgModule({
  imports: [CommonModule, MaterialPublicModule, PublicRoutes],
  declarations: [LoginComponent],
})
export class PublicModule {}
