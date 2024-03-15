import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginAuth: User = new User();
  authenticator: boolean = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  constructor() {}

  getUserLogin(User: User): void {
    this.loginAuth = User;
    const isAuthenticated: boolean =
      this.loginAuth.username === 'admin' && this.loginAuth.password === '1234';
    //si el usuario ingresado coincide va a ser true

    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}
