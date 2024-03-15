import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginAuth: User = new User();
  authenticator: boolean = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  getUserLogin(User: User): void {
    this.loginAuth = User;
    const isAuthenticated: boolean =
      this.loginAuth.username === 'admin' && this.loginAuth.password === '1234';
    //si el usuario ingresado coincide va a ser true

    this.isAuthenticatedSubject.next(isAuthenticated);
    this.authenticator = isAuthenticated;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.isAuthenticatedSubject.next(false);
  }
}
