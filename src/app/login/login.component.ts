import { Component } from '@angular/core';
import { AuthService } from '../servicos/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';

  constructor(private authService: AuthService) {}

  fazerLogin(): void {
    if (!this.usuario || !this.senha) {
      alert('Por favor, preencha o usuário e a senha.');
      return;
    }

    const sucesso = this.authService.fazerLogin(this.usuario, this.senha);
    if (!sucesso) {
      alert('Usuário ou senha incorretos! Dica: utilize usuário "admin" e senha "123".');
    }
  }
}


