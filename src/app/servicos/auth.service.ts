import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logadoSubject = new BehaviorSubject<boolean>(this.temToken());
  public logado$: Observable<boolean> = this.logadoSubject.asObservable();

  constructor(private router: Router) {}

  private temToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // 6, 8 e 9: Service de Login, criação de Token e redirecionamento para Área Restrita
  fazerLogin(usuario: string, senha: string): boolean {
    if (usuario === 'admin' && senha === '123') {
      // 8. Criar token
      const token = 'token-auth-' + btoa(`${usuario}:${Date.now()}`);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', usuario);
      this.logadoSubject.next(true);

      // 9. Redirecionar para Área Restrita
      this.router.navigate(['/restrita']);
      return true;
    }
    return false;
  }

  // 10. Método para verificar se está autenticado (usado pelo Guard)
  estaAutenticado(): boolean {
    return this.temToken();
  }

  getUsuario(): string {
    return localStorage.getItem('usuario') || '';
  }

  // Logout e remoção do token
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.logadoSubject.next(false);
    this.router.navigate(['/login']);
  }
}
