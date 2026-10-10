import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GamesShop';
  mostrarMenu: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // 12. Esconder Menu público ao navegar para a Área Restrita
      this.mostrarMenu = !event.urlAfterRedirects.startsWith('/restrita');
    });
  }
}

