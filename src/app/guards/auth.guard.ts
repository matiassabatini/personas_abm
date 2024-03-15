import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  permitir: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.authenticator == true) {
      this.permitir = true;
    } else {
      console.log('el usuario no esta logeado');

      this.router.navigate(['/login']);
    }

    return this.permitir;
    /*   return true; */
  }
}
