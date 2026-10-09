import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  fazerLogin(): void {
    if (this.usuario && this.senha) {
      alert(`Bem-vindo(a), ${this.usuario}!`);
      this.router.navigate(['/inicio']);
    } else {
      alert('Por favor, preencha o usuário e a senha.');
    }
  }
}

