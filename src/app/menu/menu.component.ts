import { Component } from '@angular/core';
import { AuthService } from '../servicos/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private authService: AuthService) {}

  estaLogado(): boolean {
    return this.authService.estaAutenticado();
  }

  logout(): void {
    this.authService.logout();
  }
}

