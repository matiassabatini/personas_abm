import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}
  onSubmit() {
    if (this.loginForm.valid) {
      const login: User = new User();
      login.username = this.loginForm.value.username;
      login.password = this.loginForm.value.password;
      this.authService.getUserLogin(login);
      console.log(login);
      this.authRedirect();
      this.showError = false;
    } else {
      this.showError = true;
    }
  }

  authRedirect() {
    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
      if (authenticated) {
        console.log('Autenticado');
        this.authService.authenticator = true;
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuario o Contraseña Invalida.',
          text: 'Por favor, inténtalo de nuevo.',
        });
        console.log('Credenciales inválidas');
      }
    });
  }
}
