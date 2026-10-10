import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RestritaComponent } from './restrita/restrita.component';
import { ListaProdutoComponent } from './restrita/lista-produto/lista-produto.component';
import { CadastroProdutoComponent } from './restrita/cadastro-produto/cadastro-produto.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'restrita',
    component: RestritaComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'cadastro', component: CadastroProdutoComponent },
      { path: 'lista', component: ListaProdutoComponent },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

