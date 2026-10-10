import { Component } from '@angular/core';
import { AuthService } from '../../servicos/auth.service';

@Component({
  selector: 'app-menu-restrita',
  templateUrl: './menu-restrita.component.html',
  styleUrls: ['./menu-restrita.component.css']
})
export class MenuRestritaComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
